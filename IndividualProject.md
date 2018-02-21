# SEGR 5910 18WQ - DevOps from the Architect's Perspective

## Individual project

### Objective

The practical assessment is intended to:

* Show your ability to automate the deployment of a software stack
* Show off your infrastructure-as-code skills
* Assess your ability to make pragmatic technical tradeoffs given a deadline
* Take approximately 3-6 hours

### Background

A new team at IniTech have been tasked with creating a guestbook application so that users can leave feedback about their experience with IniTech's software. They have created a Minimal Viable Product and now wish to determine the best way to deploy their application.

The team feels very strongly that they do not want to use a Platform as a Service offering (such as Heroku, ECS, AppEngine) because they want to have flexibility in their deployment. Other than that, they are very open to suggestions about the best way for them to deploy their software.

The application is written in Go, and does not require any web server. It consists of:

* A single binary, which runs the web server
* Some static web assets (CSS stylesheet, a HTML index page and some javascript)
* The application persists all its data to Redis and the deployment of redis alongside the web app is required.


### The Problem

The developers have made an application artifact available via a public URL.

This is a zip file with the built application, as well all the static assets. You can download the zip file from here:

https://github.com/michaeljon/SU_SEGR_5910_18WQ/blob/master/webapp.tar.gz

(The application implements https://github.com/michaeljon/SU_SEGR_5910_18WQ/tree/master/project)

The application developers wish for you to create a deployment process for the application, which is repeatable. The developers feel very strongly that they should be able to:

* Clone a git repository
* Optionally set an API key
* Run a single command, and have the application deployed automatically - either by pulling from the git repo or downloading from the S3 bucket.
* You can target any (additional) technologies you wish to solve this problem. The only requirement is that clear instructions are provided for a novice user to be able to follow to get a stack running.

A production grade deployment solution is not required at this time, however consideration for the long term future of the application will be looked upon favourably.

### Some additional comments and notes

The footprint of the running project should be a web server (implemented by the application main.go), 
and the necessary redis server(s). `main.go` expects to connect to two redis servers. The first,
called `redis-master` is used for write operations, and the second, called `redis-slave` is used for 
offloading read operations.

You can connect the slave to the master using a command like: `redis-server --slaveof redis-master 6379`. This
tells the redis server to start and connect to a second server called `redis-master` on port 6379.

### Outputs
The final output should be a git repository with the following:

* A README, explaining how to run the deployment process and set any configuration options, like API keys
* The deployment scripts/configuration
* A JUSTIFICATION file, with:
    * A short explanation of why you choose your chosen technology
    * A short explanation of how you might improve or extend your solution, given more time


