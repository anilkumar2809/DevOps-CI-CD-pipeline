# Pipeline-Template

The env file should be having environment values similar to the below ones - 
```
vm_name = p11
ip_address = 192.168.52.100
config_vm_name = config
ip_address_config = 192.168.52.10
key_name = vm-server
memory = 16384
```

The Steps involved in building the pipeline - 

1) Provision the VM - Once the VM configurations are present in the env file and ```pipeline init``` command is run, the vm is instantiated and will be ready to ssh into it. 
2) Build the setup - Once the vm is ready to use, the setup in the build.yml is run to make it suitable for running the application - the steps include installing the requirements. in the build job, the repo is cloned, docker-compose is installed and using the command ```docker-compose up --build``` the build is built and will be succesful after all the requirements are installed and the databases are setup. Because of time constraint, I had to chose this project where build was done using docker. 
3) Prod up - Once the VM is setup after succesfully running the application ```pipeline prod up``` will be used to create an cloud instance. 
4) Deploy - After the cloud instance was created, we will have a task in build.yml to deploy this application in the cloud instance created. 


New Feature - 

The new feature I thought of implementing is to do deploy back to the stable version we define if there is any error in the continous deployment we do. This way we can actually know if the new updates in the software can be rolled back to the stable versions very easily if there are any bugs. 



## Screencast 

Link to Screencast for Windows (If above hyperlink is not working) - 

<br>
Note - I was able to finish the provisioning and runnning the application succesfully here, but not able to finish the prod up and deploy command. 

