#!/usr/bin/env node
const program = require("commander")

const init = require("./commands/init")
const update = require("./commands/update")
const run = require("./commands/run")

program
  .version(require("./package.json").version)
  .command("init [base_url]")
  .description("init ipapk config")
  .usage("http://127.0.0.1")
  .action(init)

program.command("update")
  .description("update html")
  .action(update)

program.command("run [port]")
  .description("run a static http server")
  .usage("80")
  .action(run)

program.parse(process.argv)