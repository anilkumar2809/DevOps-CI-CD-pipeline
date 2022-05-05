const fs = require('fs');
const SSH =require("./SSH");
const dotenv = require('dotenv');
const { pkgConf } = require('yargs');
const { Agent } = require('http');
dotenv.config();
var port
class monitoringinfra{

async dashboard(processor)
{
//copy dashboard files
var inventoryJSON = fs.readFileSync('inventory.JSON');
inventoryJSON = JSON.parse(inventoryJSON)
var ip=monitor_info_json["dashboard"].ip
await SSH.executeDroplet(processor, `sudo rm  -rf dashboard`, ip);
await SSH.executeVM(processor, `scp -i ~/.ssh/${process.env.vm_name}  -o StrictHostKeyChecking=no  -o UserKnownHostsFile=/dev/null -r ${sharedPath}/Moninfra/dashboard root@${ip}:~`, ip);
//copy inventory file inside dashboard folder
await SSH.executeVM(processor, `scp -i ~/.ssh/${process.env.vm_name}  -o StrictHostKeyChecking=no  -o UserKnownHostsFile=/dev/null -r ${sharedPath}/inventory.json root@${ip}:dashboard/metrics/`, ip);
await SSH.executeVM(processor, `scp -i ~/.ssh/${process.env.vm_name}  -o StrictHostKeyChecking=no  -o UserKnownHostsFile=/dev/null -r ${sharedPath}/lib/dashboard/redis.conf root@${ip}:/etc/redis/`, ip);
await SSH.executeDroplet(processor, `sudo service redis-server restart`, ip);
await SSH.executeDroplet(processor, `sudo forever stopall`, ip);
await SSH.executeDroplet(processor, `sudo forever start  dashboard/`, ip);


}
async loadagent(processor,job_name, build_path){
 //copy agent.js
 var inventoryJSON = fs.readFileSync('inventory.JSON');
 inventoryJSON = JSON.parse(inventoryJSON)
let portr=await this.portreturn(job_name,build_path)
 for(let k in inventoryJSON){
  
    if(k =='droplet-blue' || k=='droplet-green')
    {
        var ip=monitor_info_json[k].ip
        let dic={"servername": k, "port":8080}
        dic=JSON.stringify(dic);
    fs.writeFileSync("servername.JSON", dic);
    await SSH.executeVM(processor, `scp -i ~/.ssh/${process.env.vm_name}  -o StrictHostKeyChecking=no  -o UserKnownHostsFile=/dev/null -r ${sharedPath}/Moninfra/Agent.js root@${ip}:`, ip);
    await SSH.executeVM(processor, `scp -i ~/.ssh/${process.env.vm_name}  -o StrictHostKeyChecking=no  -o UserKnownHostsFile=/dev/null -r ${sharedPath}/Moninfra package.json root@${ip}:`, ip);
    await SSH.executeVM(processor, `scp -i ~/.ssh/${process.env.vm_name}  -o StrictHostKeyChecking=no  -o UserKnownHostsFile=/dev/null -r ${sharedPath}/inventory.json root@${ip}:`, ip); 
    await SSH.executeVM(processor, `scp -i ~/.ssh/${process.env.vm_name}  -o StrictHostKeyChecking=no  -o UserKnownHostsFile=/dev/null -r ${sharedPath}/servername.json root@${ip}:`, ip); 
    await SSH.executeDroplet(processor, `sudo forever stopall`, ip);
    await SSH.executeDroplet(processor, `sudo forever start Agent.js`, ip);

    }
    }
}
// async portreturn(job_name,build_path)
// {
//     let build_file =`yaml/${build_path}`;
//  const ymlFil = yaml.load(fs.readFileSync(build_file, 'utf8'));
//         let yamlFil = JSON.stringify(ymlFil);
//         yamlFil = JSON.parse(yamlFil);
        
//         let jobs = yamlFil.jobs;
        
//         await dpkg.vmUnlocker(processor);
       

//         for(let i=0; i< jobs.length;i++){
//          {   
//             if(jobs[i].name == job_name)
//                 {
//                     port =jobs[i].port
//                 }
//         }
// }
// return port
// }


}
module.exports = new monitoringinfra();


