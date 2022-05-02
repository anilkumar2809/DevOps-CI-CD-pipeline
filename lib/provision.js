const child  = require("child_process");
const VBoxManage = require('../lib/VBoxManage');
var fs = require('fs');
const dotenv = require('dotenv');
const chalk = require("chalk");
dotenv.config();
let ip_address = process.env.ip_address;
var jsonData={}
let vm_name = process.env.vm_name;

class Builder{
    async mac(){
        
        try{child.execSync(`vm stop ${vm_name}`,{stdio: 'pipe'});}
        catch{}
        try{child.execSync(`vm rm ${vm_name}`,{stdio: 'pipe'});}
        catch{}
        try{
            child.execSync(`vm images | grep ubuntu:jammy`);
        }catch(e){
            child.execSync(`vm pull ubuntu:jammy`,{stdio: 'inherit'});
        }

        child.execSync(`vm run ${vm_name} ubuntu:jammy`,{stdio: 'inherit'});
        let info = child.execSync(`vm ssh-config ${vm_name}`).toString();
        let info_dic = {};
        var temp;
        info = info.trim();
        info = info.split("\n");

        for(let i=0; i<info.length; i++){
            temp = info[i].trim();
            temp = temp.split(' ');
            info_dic[temp[0]] = temp[1];
        }

        info_dic['keyPath'] = "~/Library/'Application Support'/basicvm/key";
        info_dic['sharedPath'] = "~/shared/cwd";
        jsonData = JSON.stringify(info_dic);
        await this.writeToJson();
    }

    async windows(name)
    {
        console.log(chalk.green(`Windows machine detected and processor is Intel/AMD`))
        
        let vmdata = await this.vmSetup(name,ip_address)    
        let newData = {
            "Host": vm_name,
            "HostName": process.env.ip_address,
            "User": vmdata["user"],
            "keyPath": `~/.ssh/${process.env.key_name}`,
            "bakerx_keyPath": vmdata['IdentityFile'],
            "vm_port":vmdata["Port"],
            "loopback_ip": '127.0.0.1',
            "sharedPath": "/bakerx"
        }
        jsonData= JSON.stringify(newData);
        await this.writeToJson(); 
    }

    async vmSetup(name, ipaddress)
    {
        console.log('Virtual Machine name -->', name)
        try{
           child.execSync(`bakerx images | grep focal`)      
        }catch(e)
        {
            child.execSync(`bakerx pull focal cloud-images.ubuntu.com`, {stdio: ['inherit', 'inherit', 'inherit']});
        }
        child.execSync(`bakerx run ${name} focal --ip ${ipaddress} --sync --memory ${process.env.memory}`, {stdio: 'inherit'});
        let state = await VBoxManage.show(name);
        console.log(`VM is currently: ${state}`); 
        var info_cmd = `bakerx ssh-info --format config ${name}`;
        const info = child.execSync(info_cmd).toString();
        let data={}
        let info_split = info.split("\n");
        for(let i=0; i<info_split.lengt; i++){
            if(i!=0){
                let temp = info_split[i].split(' ')
                if(temp.length == 6){
                    let key = temp[4]
                    let value = temp[5]
                    data[key] = value
                }
            }
        }
        return data
    }

    async writeToJson(){
        console.log(jsonData);
        fs.writeFileSync("config.JSON", jsonData); 
        console.log("data saved to config.JSON");
       
    }
}
module.exports = new Builder();
