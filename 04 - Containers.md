# 04 - Containers steps

These are the steps we're going to walk through in class to demonstrate some docker functionality. 
The names are going to be different here because we're letting docker automatically creat them for us.
That's ok, we can figure out what we need to figure out.

## First things, first

You should probably read the [docker documentation](https://docs.docker.com/). It's actually
very well written.

### Make sure you have docker installed

You can get docker at its [download location](https://www.docker.com/community-edition#/download). There
are versions for most operating systems we'll use in class.

Now, let's see if we can make this work.

1. `docker run hello-world`
2. `docker images`

~~~~
➜  ~  docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              f2a91732366c        2 months ago        1.85kB
~~~~

3. `docker pull ubuntu`
4. `docker images`

~~~~
➜  ~  docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              0458a4468cbc        6 days ago          112MB
hello-world         latest              f2a91732366c        2 months ago        1.85kB
~~~~

Let's look inside the container. It's easy enough, we just run it and we end up in a shell.

5. `docker run -it ubuntu`

Now, while we're here, let's install some packages _inside_ the container. These are just a few things
we'll want, well need, to get our little sample application running.

6. `apt-get update && apt-get install wget nodejs npm`
7. Now, get out by typing `exit` or using the `ctrl-d` shortcut

Let's see what we have going on now. This is a slightly changed way to ask; I'm doing it this way
to keep the width constant.

8. `docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Command}}\t{{.Status}}\t{{.Names}}"`

~~~~
➜  18WQ (master) ✗) docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Command}}\t{{.Status}}\t{{.Names}}"
CONTAINER ID        IMAGE               COMMAND             STATUS                      NAMES
d0355ad9e621        ubuntu              "/bin/bash"         Exited (0) 16 seconds ago   hopeful_easley
e04d12fba37b        hello-world         "/hello"            Exited (0) 11 minutes ago   affectionate_mahavira
~~~~

Let's commit our changes back to the repository. We'll take the ubuntu image, named "hopeful_easley" here, and
run the following to create a new image called "segr5910".

9. `docker commit hopeful_easley segr5910`

~~~~
➜  18WQ (master) ✗) docker images
REPOSITORY          TAG                 IMAGE ID            CREATED                  SIZE
segr5910            latest              94344cac8678        Less than a second ago   439MB
ubuntu              latest              0458a4468cbc        6 days ago               112MB
hello-world         latest              f2a91732366c        2 months ago             1.85kB
~~~~

Cool, now we have a new base image that has some of the core software that's necessary to run our application. Notice
that the size of the image has grown quite a bit. That's because we pull in those three dependencies and we ran a 
quick OS update to make sure we have the latest of everything else.

Now we'll run the new image and install our application. So, do the following

10. `docker run -it segr5910`

Look, we're back in the container. Let's install our application.

11. `mkdir /application && cd /application` to create a directory where we'll put the application
12. `wget https://raw.githubusercontent.com/michaeljon/SU_SEGR_5910_18WQ/master/containers/initialization_script`
13. `wget https://raw.githubusercontent.com/michaeljon/SU_SEGR_5910_18WQ/master/containers/ipshow.js`
14. `ctrl-d` to get out

Let's have another look at the containers

15. `docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Command}}\t{{.Status}}\t{{.Names}}"`

~~~~
➜  containers (master) ✗) docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Command}}\t{{.Status}}\t{{.Names}}"
CONTAINER ID        IMAGE               COMMAND             STATUS                      NAMES
6503cd2cf28d        segr5910            "/bin/bash"         Exited (0) 33 seconds ago   blissful_spence
d0355ad9e621        ubuntu              "/bin/bash"         Exited (0) 24 minutes ago   hopeful_easley
e04d12fba37b        hello-world         "/hello"            Exited (0) 35 minutes ago   affectionate_mahavira
~~~~

Now we're going to make our application's container. This will be the thing we run later.

16. `docker commit blissful_spence ipshow` to commit the image with a new name

And, let's see what the images look like again.

17. `docker images`

~~~~
➜  ~  docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ipshow              latest              5587bc596c6c        6 seconds ago       439MB
segr5910            latest              94344cac8678        20 minutes ago      439MB
ubuntu              latest              0458a4468cbc        6 days ago          112MB
hello-world         latest              f2a91732366c        2 months ago        1.85kB
~~~~

Woo hoo. We have an image for our application. Let's run it. This time we want to expose the port so we can connect. We'll use `curl`
for this example, but you can open your browser, `wget` or `nc` or anything else that lets you make an HTTP request.

18. `docker run -it -p 0.0.0.0:8080:8080 ipshow /bin/bash /application/initialization_script`

~~~~
➜  containers (master) ✗) curl http://localhost:8080
host ip: 67.182.137.123

other ip addresses:
127.0.0.1
172.17.0.2
~~~~

Alright, that was fun, but oh, boy, what a bunch of typing. Too many things to think about. Too many
steps where things can go seriously wrong. Let's try a different approach. Let's let docker do all
the heavy lifting for us. We'll create a Dockerfile

~~~~
FROM ubuntu

ADD . /application

RUN apt-get update && \
    apt-get install -y wget nodejs npm

EXPOSE 8080 8080

CMD ["bash", "/application/initialization_script"]
~~~~

1. `docker build . -t ipshow` to get the image built
2. `docker run -it -p 0.0.0.0:8080:8080 ipshow` to run it

Done. Now, wasn't that better?
