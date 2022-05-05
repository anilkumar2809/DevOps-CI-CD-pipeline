exports.command = 'monitoring';
exports.desc = 'MOnitor the droplets  and store information ';
const monitoringinfra = require("../lib/monitoringinfra");

exports.builder = yargs => {
    yargs.options({
    });
};

exports.handler = async argv => {
    const{processor} = argv;
  await monitoringinfra.dashboard(processor);
  await monitoringinfra.loadagent(processor);
};