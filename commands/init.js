const fs = require('fs-extra')
const path = require('path')
const merge = require('merge')

module.exports = function(base_url)
{
    const config_path = path.resolve("ipapk_config.json")

    const default_config = require("../templates/config.json")

    let config = default_config

    if(fs.existsSync(config_path))
    {
        config = require(config_path)
        config = merge(true,default_config,config)
    }

    config.base_url = base_url || config.base_url || "http://127.0.0.1"

    fs.writeFileSync(config_path, JSON.stringify(config,null,"\t"))

    console.log("init success:create ipapk_config.json done!")
}