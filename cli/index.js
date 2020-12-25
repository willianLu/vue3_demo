const { program } = require("commander");
const execa = require("execa");
const package = require('../package.json');

console.log('cli------------工具');
program.version(package.version);

program.command('dev [IP]').action((IP, cmdObj) => {
    let command = `vue-cli-service serve`;
    if(IP) command = `cross-env IP=${IP} ${command}`;
    execa(command, { stdio: [0, 1, 2] })
})

program.parse(process.argv);