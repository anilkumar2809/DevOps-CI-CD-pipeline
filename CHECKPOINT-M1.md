# Link to the google doc - https://docs.google.com/document/d/1bllr1XzT1ITnWrJLnlQhKb7howaiI0E-bwBZg5gBw6s/edit

-- Aswin
For MAC - M1

Error -- Basicvm was not detected when init file was run
Fix -- changed the binary name from basicvm to vm in the init file

Error -- .env file missing
Fix -- Created .env file in the main repo

Error -- When the vm with a name is already existing, new vm is not created and process is stopped
Fix -- Introduced new lines to stop and delete the old vm with same name

Enhancement -- When the vm with the default name is not available, it is spitting vm no available in to the console
Fix -- Used 'pipe' to avoid pushing the default lines.

Code Optimization -- Implementing mac and windows versions code in provision file

json -- Parsed the required data and saved the details into a dictionary. Eventually this will be saved into the config.json file




const chalk = require('chalk');
const path = require('path');
const createVM = require('../lib/provision')
const child  = require("child_process");
const VBoxManage = require('../lib/VBoxManage');


exports.command = 'init';
exports.desc = 'Prepare tool';
exports.builder = yargs => {
    yargs.options({
    });
};


exports.handler = async argv => {
    const { processor } = argv;
    let name = 'pj'
    if(processor == 'Arm64' ) {            
        createVM.mac(name);
    } 
    else {
        child.execSync("bakerx run pj focal", {stdio: 'inherit'});
        let state = await VBoxManage.show(name);
        console.log(`VM is currently: ${state}`);
    }
};
