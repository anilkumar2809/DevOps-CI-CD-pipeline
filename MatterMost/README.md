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
2) Build the setup - Once the vm is ready to use, the setup in the build.yml is run to make it suitable for running the application - the steps include installing the requirements. Once the database is setup, the users had to be added to the system. Also in the config.json, we need to update the Drivername, siteURL to make the user access the database correctly. Then restart the service
3) Prod up - Once the VM is setup after succesfully running the application ```pipeline prod up``` will be used to create an cloud instance. 
4) Deploy - After the cloud instance was created, we will have a task in build.yml to deploy this application in the cloud instance created. 


New Feature - 
i came up with something like do unit testing for the operational mattermost server to see if really the build is successful or not.



## Screencast 
<br>
Link to Screencast for Windows (If above hyperlink is not working) - https://drive.google.com/file/d/1Sk03wI5lIXO4gtq8aSSk6KluiBWWnSxP/view?usp=sharing



Note - For this project I was able to complete only the provisioning VM part for building a pipeline.
