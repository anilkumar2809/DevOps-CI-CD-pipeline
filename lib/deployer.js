const fs = require('fs');
const yaml = require('js-yaml');
const chalk = require("chalk");
const SSH =require("./SSH");
const dotenv = require('dotenv');
dotenv.config();

class Deployment{
    async deployJob(processor, jobName, buildFile){
        let mysql_pass = process.env.db_pass;
        let build_file =`lib/${buildFile}`;
        var configJSON = fs.readFileSync('config.json');
        var sharedPath=JSON.parse(configJSON).sharedPath
        var inventoryJSON = fs.readFileSync('inventory.JSON');
        var ip = JSON.parse(inventoryJSON).ip;

        const ymlFile = yaml.load(fs.readFileSync(build_file, 'utf8'));
        let yamlFile = JSON.stringify(ymlFile);
        yamlFile = JSON.parse(yamlFile);
        let setup = yamlFile.setup;
        let jobs = yamlFile.jobs;

        for(let i=0; i < setup.length; i++) {
            setup[i] = setup[i].replace("{{mysql_pass}}", mysql_pass);
            await SSH.executeDroplet(processor, setup[i], ip);
        }

        for(let i=0; i< jobs.length;i++){
            if(jobs[i].name == jobName && jobName == "itrust-deploy"){
                let steps = jobs[i].steps;
                steps = JSON.stringify(steps);
                steps = JSON.parse(steps);

                for(let j=0;j<steps.length;j++){
                    let cmd_name = steps[j].name;
                    console.log(chalk.green(cmd_name));
                    let cmd = steps[j].run;
                    cmd = cmd.replace("{{mysql_pass}}", mysql_pass);
                    await SSH.executeDroplet(processor, cmd, ip);
                }

                await SSH.executeDroplet(processor, `scp -r ${sharedPath}/scripts/tomcat.sh root@${ip}:`, ip);
            }
        }
    }
}
module.exports = new Deployment();

