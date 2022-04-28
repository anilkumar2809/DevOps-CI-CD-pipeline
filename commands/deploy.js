exports.command = 'deploy inventory <jobName> <buildFile>';
exports.desc = 'Deploys the job into cloud';
const builder = require("../lib/builder.js");
const deployer = require("../lib/deployer.js");
const monitor = require("../commands/monitor.js");

exports.builder = yargs => {
    yargs.options({
    });
};

exports.handler = async argv => {
    const { processor, jobName, buildFile } = argv;
    await deployer.deployJob(processor, jobName, buildFile);
    // await monitor.loadProxy()
    // await monitor.run()
};