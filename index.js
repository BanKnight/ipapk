#!/usr/bin/env node
const program = require("commander")

const init = require("./commands/init")
const update = require("./commands/update")

program
  .version(require("./package.json").version)
  .command("init <base_url>")
  .description("init ipapk")
  .usage("init https://127.0.0.1")
  .action(init)

program.command("update")
  .description("update html")
  .action(update)

program.parse(process.argv)