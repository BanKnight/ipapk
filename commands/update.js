
const path = require("path")
const fs = require('fs-extra')
const filesize = require('filesize')
const AppInfoParser = require('app-info-parser')

const html = require("../templates/html")
const create_plist = require("../templates/plist")
const ipa = require("../templates/ipa")
const apk = require("../templates/apk")

module.exports = async function()
{
    const config_path = path.resolve("config.json")
    const cacahe_path = path.resolve("cacahe.json")

    if(fs.existsSync(config_path) == false)
    {
        console.error("config.json not found,please run init command first")
        process.exit(1)
        return
    }

    if(fs.existsSync(cacahe_path) == false)
    {
        fs.writeFileSync(cacahe_path,JSON.stringify({}))
    }

    const config = require(config_path)
    const cache = require(cacahe_path)

    const env = {
        config,
        cache,
    }

    const ipas = await walk_ipas(env)
    const apks = await walk_apks(env)

    const ipas_html = output_ipas(ipas,env)
    const apks_html = output_apks(apks,env)

    const content = html({ipas : ipas_html, apks : apks_html})
  
    fs.writeFileSync("index.html", content)

    update_cache(cache,ipas,apks)

    fs.writeFileSync(cacahe_path,JSON.stringify(cache,null,4))
}

async function walk(dir,callback) 
{
    const files = fs.readdirSync(dir)

    for(let file of files)
    {
        const full = path.join(dir,file)
        if(fs.statSync(full).isDirectory())
        {
            await walk(full,callback)
        }
        else
        {
            await callback(full)
        }
    }
}

async function walk_ipas(env)
{    
    const ipas_folder = path.resolve("./ipas")

    if(await fs.exists(ipas_folder) == false)
    {
        return apps
    }

    const apps = []

    await walk(ipas_folder,async function(file){  

        const basename = path.basename(file)
        const extname = path.extname(file)
        const relative = path.relative(process.cwd(),file)

        if(extname != ".ipa")
        {
            return
        }

        const stat = fs.lstatSync(file)

        let app = env.cache[relative]
        if(app && stat.mtime.getTime() == app.mtime)
        {
            apps.push(app)
            return
        }
        
        app = { 
            filename: basename,
            relative: relative,
            size : stat.size,
            mtime : stat.mtime.getTime(),
        }
        
        const parser = new AppInfoParser(file) 

        const result = await parser.parse()

        app.name = result.CFBundleDisplayName || result.CFBundleName || result.CFBundleExecutable
        app.version = result.CFBundleShortVersionString
        app.identifier = result.CFBundleIdentifier
        app.build = result.CFBundleVersion

        apps.push(app)

        console.log(relative,"parse done!")
    })

    apps.sort((a, b) =>b.mtime - a.mtime)
  
    return apps
}

async function walk_apks(env)
{
    const folder = path.resolve("./apks")

    const apps = []

    if(await fs.exists(folder) == false)
    {
        return apps
    }

    await walk(folder,async function(file){

        const basename = path.basename(file)
        const extname = path.extname(file)
        const relative = path.relative(process.cwd(),file)

        if(extname != ".apk")
        {
            return
        }

        const stat = fs.lstatSync(file)

        let app = env.cache[relative]

        if(app && stat.mtime.getTime() == app.mtime)
        {
            apps.push(app)
            return
        }
        
        app = { 
            filename: basename,
            relative: relative,
            size : stat.size,
            mtime : stat.mtime.getTime(),
        }

        const parser = new AppInfoParser(file) 

        const result = await parser.parse()

        app.name = result.application.label[0]
        app.build = result.versionCode,
        app.version = result.versionName,
        app.icon = result.icon

        apps.push(app)

        console.log(relative,"parse done!")
    })

    apps.sort((a, b) =>b.mtime - a.mtime)

    return apps
}

function output_ipas(all,env)
{
    const config = env.config
    const plist_folder = path.resolve("./plist")

    fs.ensureDirSync(plist_folder)

    all = all.slice(0, config.max)

    let html = ""
    for(const app of all)
    {
      const plist_name = `${path.basename(app.filename, path.extname(app.filename))}.plist`
  
      const one = {
        url : `${config.base_url}/ipas/${app.filename}`,
        icon: app.icon || "icon.png",
        identifier : app.identifier,
        version: app.version,
        build: app.build,
        name : app.name,
        mtime: new Date(app.mtime).toLocaleString(),
        size: filesize(app.size),
        plist: `itms-services://?action=download-manifest&url=${config.base_url}/plist/${plist_name}`,
      }
  
      const aplist_content = create_plist(one)
  
      fs.writeFileSync(path.join(plist_folder, plist_name), aplist_content)
  
      html += ipa(one) 
      html += "\n"
    }

    return html
}

function output_apks(all,env)
{
    const config = env.config

    all = all.slice(0, config.max)

    let html = ""
    for(const app of all)
    {  
      const one = {
        url : `${config.base_url}/apks/${app.filename}`,
        version: app.version,
        build: app.build,
        name : app.name,
        mtime: new Date(app.mtime).toLocaleString(),
        size: filesize(app.size),
      }
  
      html += apk(one) 
      html += "\n"
    }

    return html
}

function update_cache(cache,ipas,apks)
{
    for(let one of ipas)
    {
        cache[one.relative] = one
    }

    for(let one of apks)
    {
        cache[one.relative] = one
    }
}
