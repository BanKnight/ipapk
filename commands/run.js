const https = require('https');

const Koa = require('koa');
const serve = require('koa-static');

const fs = require('fs-extra')
const path = require('path')

const app = new Koa();

module.exports = function(port)
{
    const config_path = path.resolve("ipapk_config.json")

    if(fs.existsSync(config_path) == false)
    {
        console.error("you should run init first" )
        process.exit(1)
    }

    const config = require(config_path)

    app.use(serve('.'))

    if(config.base_url.startsWith("https"))
    {
        run_https(port)
    }
    else
    {
        run_http(port)
    }

    app.once("error",(error)=>{
        console.error(error);
    })
}

function run_https(port)
{
    port = port || 443

    if(fs.existsSync('./ipapk.key') && fs.existsSync('./ipapk.crt'))
    {
        const options = {
            key: fs.readFileSync('./ipapk.key'),
            cert: fs.readFileSync('./ipapk.crt')
        }
        
        https.createServer(options, app.callback()).listen(port,()=>
        {
            console.log(`https server is listening at: ${port}`);
        });
    }
    else
    {
        console.error(`ipapk.key or ipapk.crt not exist`)
    }
}

function run_http(port)
{
    port = port || 80

    app.listen(port,()=>{
        console.log(`http server is listening at: ${port}`);
    });
}

