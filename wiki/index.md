# The title

## What is it

Contains all files for cloud deployment: digital ocean, aws, azure, linode, etc..

## Files

### ./hatch

A type script project for deploying machines.

To install

    npm link .

To run

    hatch --help

Deployment requires a common repository to store files, to set, run:

    hatch repo "ssh commad"

hatch works via SSH and only SSH, thus any remote target is defined as "ssh command", it's assumed that

1. the target is a linux (debian tested)
2. can be ssh'ed witout password

./bootstrap contains the shell scripts for initializaing new VM.

To push a file to repo

    hatch push <file>

./eggs defines the deployable docker-compose envrionments.

To deploy an egg to target

    hatch deploy <egg> "ssh cmd"


### deploy/

Contains the deployments.  Remove vagrants in the future.

./<platform>/<VM_instances>
