# Supplier pay design overview

## System components

&nbsp;

The system consists of the logical components displayed in the grey blocks in the diagram below.

&nbsp;

[gimmick:yuml]([Chinese-Supplier{bg:wheat}]->[Website-Supplier],[US-Buyer{bg:wheat}]->[Website-Buyer], [Website-Buyer]-[US-Banking-Processor], [Website-Supplier]-[China-Banking-Processor], [China-Banking-Processor]-[Back-Office-Tools], [US-Banking-Processor]-[Back-Office-Tools])

Each component will be explained in more detail in sections below.

### Website-Supplier

This is the website facing the Chinese supplier.  The site language will be in Chinese.

### Website-Buyer

This is teh website facing the US byer.  The site language will be in English.

### China-Banking-Processor

This component will be a daemon process that talks to the Chinese bank account of Supplier-Pay, to reconcile the actual bank transactions with the transactions in the Supplier-Pay system, among other tasks.

### US-Banking-Processor

This component will be a daemon process that talks to the US bank account of Supplier-Pay, to reconcile the actual bank transactions with the transactions in the Supplier-Pay system, among other tasks.

### Back-Office-Tools

Refers to the collection of tools (or internal webapps, if required) that allow Supplier-pay team to monitor/update the system for customer-support, error-correction, auditing purpose, etc...

## Implementation stages


### Stage 1

Initial implementation will focus on the websites facing the supplier and buyer.  We will focus on usability, design aesthetic, reliability and KYC of the sites.  

### After stage 1

The goal of the components (China-Banking-Processor, US-Banking-Processor, Back-Office-Tools) is to help and assist human operators in monitoring/facilitating the transactiosn.  The eventual goal is to automate the process as much as possible, and just provide a dashboard for human operators to monitor and oversee the processes.  Acheiving this goal will be an iterative process that will evolve continually long after the system goes live.  


## Technical design

The technical design will involve considerabelly more compoenents such as database, external queues, docker, etc...  We will table the discussion of the specifics for now as they are too technical.


## Deployment topography

We will deploy the websites in a cloud hosted in Hongkong (Azure), as Hongkong offers fast access to both China and USA.  The non customer facing components can be deployed elsewhere, most likely using digitalocean.com.  (I am a user and fan of digitalocean.com, which is a cloud provider with locations in Singapore and US, among other places.)





[gimmick:Disqus](supplierpay)