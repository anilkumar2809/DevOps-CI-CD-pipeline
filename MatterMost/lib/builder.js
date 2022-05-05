const fs = require('fs');
const yaml = require('js-yaml');
const chalk = require("chalk");
const SSH =require("./SSH");
const dotenv = require('dotenv');
dotenv.config();


class Builder{

    async build_job(processor, job_name, build_path) {
        let git_token = process.env.git_token;
        let mysql_pass = process.env.db_pass;
        var configJSON = fs.readFileSync('config.json');
        let build_file =`yaml/${build_path}`;
        var sharedPath=JSON.parse(configJSON).sharedPath
        var user=JSON.parse(configJSON).User

        const ymlFile = yaml.load(fs.readFileSync(build_file, 'utf8'));
        let yamlFile = JSON.stringify(ymlFile);
        yamlFile = JSON.parse(yamlFile);
        let setup = yamlFile.setup;
        let jobs = yamlFile.jobs;
        
        for(let i=0; i < setup.length; i++) {
            await SSH.executeVM(processor, setup[i])
        }
    }
}
module.exports = new Builder();
