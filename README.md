# Pipeline-Template
| Readme Loc | Git Link |
| ----- | ----- |
| [env file](#env_file) |[Click Here](#env_file) |
| [F0 |[Click Here](#f_tag) |
| [M3 Tasks ](#m3_tag) | [Click Here](yaml/build.yml) |
| [Provisioning on cloud service](#provision_tag) | [Click Here](/lib/droplet.js) |
| [iTrust deployment job](#deployment_tag) | [Click Here](/lib/deployer.js) |
| [Deployment strategy](#strategy_tag) | [Click Here](/lib/serve.js) |
| [Challenges faced](#challenges_tag) | [Click Here](#challenges_tag) |
| [Screencast ](#screencast_tag) | [Click Here](#screencast_tag)



Specify file structure what file contains what info



```MAC M1 requirements```

```text
brew
basicvm
```

``` bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" # To install brew
$ brew install ottomatica/ottomatica/basicvm          # To install basicvm
```

```Windows/MAC Intel requirements```

```text
Choco
Virtual box
Nodejs
Bakerx
Npm
```

<a name = "env_file"></a>

```.env file```
```bash
# Add the following env variables for any OS
vm_name = Name_Of_VM                # Ex: vm-server
git_token = Git_Token               # Ex: 123adsfh32jjhg
db_pass = 12345                     # set the password of mysql 
droplet_name=drops                  # name for the SSH KEY to be placed inside the digital ocean
DROPLET_TOKEN=dp_ac8be7da.......es  # droplet token genereated from digital ocean 

# Add the following for Windows and MAC Intel
ip_address = 192.168.52.100         # Any ip can be assigned
memory = 4096                       # RAM to be assigned for vm --Recommended to use atleast 4GB
# Please make sure no comment lines are in .env file
```

<a name = "f_tag"></a>
## F0 Tasks
### pipeline jobs
Hi I have considered  https://github.com/mgpavlov/OnlineGroceryStore-Application.gits
* Commands to execute for grocerystore
* pipeline init </br>
* pipeline build grocery-build grocery_build.yml </br>
<!-- pipleline build grocery-test grocery_build.yml </br> -->
* pipeline prod up </br>
* pipeline deploy inventory grocery-deploy grocery_build. </br>
* pipleline monitoring </br>

* Project 2 is  https://github.com/rtzll/django-todolist.git </br>
* Commands to execute for djnago to do application </br>
* pipeline init </br>
* pipeline build django-build django_build.yml </br>
<!-- pipleline build django-test django_build.yml </br> -->
* pipeline prod up </br>
* pipeline deploy inventory django-deploy django_build.yml </br>
* pipleline monitoring </br>
 ### pipeline new feature
 * I have opted for monitoring part</br>
* For this task, I have created a new droplet nnamed dashboard to continously monitor the machines with the help of the 

##ISSUES FACED 
Our application was more generic for the course project which lets us deploy the application smoothly
The only hardship i faced is finding the application from GitHub to implement with the test cases and backend and front end
Apart from that haven't faced any new issues, i faced some old issues like dpkg unlock erro
For which we recursively called the function to release the locks.
And also i fixed the issue from M3 for dos2unix conversion

<a name = "m3_tag"></a>
## M3 Tasks
<a name = "provision_tag"></a>
## Provisioning on cloud service
* The [droplet.js](/lib/droplet.js) file is used to provision the instance for a target infrastructure using Digital Ocean as cloud provider. 
* We are creating droplets with the help of ssh key generated.
* We are using 3 droplets namely  droplet-blue, droplet-green to deploy the applictaion and monitor droplet to act as proxy server to monitor the health of the application.
* After creation of droplet in the Digital Ocean webiste, the infrastructure data such as droplet name, droplet id, ip address is stored in an inventory file.


```bash
pipeline prod up
```

<a name = "deployment_tag"></a>
## iTrust deployment job spec

* The [build.yml](/yaml/build.yml) has the job - itrust-build which is responisble to create a war file for deploying the iTrust application to the cloud instances of blue and green.
* We also install npm module and node js in monitor droplet and copy the required scripts into monitor droplet.
* Once, the war file is generated after succesful build and been located, the dependencies such as tomcat JRE, JDK, Maven, Apache, npm, mysql are installed and the respective commands are defined in the [build.yml](/yaml/build.yml) file. And the war is copied to the cloud instances blue and green droplets.

```bash
pipeline build deploy inventory itrust-deploy build.yml
```

<a name = "strategy_tag"></a>
## Deployment Strategy
*   We implemented the blue green deployment strategy along with healthcheck function to keep track of health of the target.
*   For this purpose our droplets droplet-blue and droplet-green contains the application which is the .war file genereate by execution of the itrust-build, which will be copied to destination droplets and also installs tomcat and restartss the tomcat server on target machines.
*   The monitor droplets runs the traffic and also checks the health of the target using the serve.js
*  we monitor the health check and start the proxy to listen on 3590 port, this will be done by monitor droplet another cloud instance.
*  we start checking the health of the target which is by default assigned to Green, and at some point of time we execute siege script to stress test the target droplet due to which the the droplet hangs for a while, which results in failover and switches to blue droplet.
*  We monitor this inside the third droplet "monitor" the code can be found at [serve.js](/lib/serve.js)
<a name = "challenges_tag"></a>
## Challenges and issues faced
* we did research a lot to create the droplet using the SSH key generated and then used axios.post to create the droplet using the fingerprint returned by the digital ocean.
* It was a challenging task to  download tomcat inside the droplets and aslo to copy the war file generated from vm into the droplets
* We faced issues  due to automating the blue green server ips as serve.js and seige.sh will be executed inside the monitor droplet, which took some time to automate the code so that they can fetch those values.
* We faced issues with dos2unix for(CRLF error), we fixed this issue by finding.sh files and usage of dos2unix package downloaded.

<a name = "screencast_tag"></a>
## Screencast 
[Click Here](https://youtu.be/OJvqAtbRG1A) for Screencast of MAC M1

Use this if the above is not working - https://youtu.be/OJvqAtbRG1A

[Click Here](https://youtu.be/dHr_4H2M6yM) for Screencast of Windows
<br>
Link to Screencast for Windows (If above hyperlink is not working) - https://youtu.be/dHr_4H2M6yM
