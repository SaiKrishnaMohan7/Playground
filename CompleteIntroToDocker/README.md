# Docker Intro

Creates a new environment that's isolated by namespace and limited by cgroups and chroot'ing you into it.
`cat /etc/issue`: shows which os (container) you are in

## Containers

A combination of 3 kernel features, _chroot_, _cgroups_ and _namespace_

### chroot - change root

- [chroot-bholt](https://btholt.github.io/complete-intro-to-containers/chroot)
- Allows to set the root dir of a new process (linux jail)
- `docker run -it --name docker-host --rm --privileged ubuntu:bionic`, `-it`: `interactive`
- `chroot myNewRoot/ bash`: change root to myNewRoot and run bash in there right after
- Now, for `bash` to run in there it neeeds dependencies, `ldd bash` gives the list of these dependencies
- `mkdir myNewRoot/lib{,64}`: make 2 new dirs in myNewRoot call it lib and lib64
- [Shell scripts realted to this](https://github.com/btholt/projects-for-complete-intro-to-containers/blob/master/chroot/setup.sh)

### namespaces

Hide processes from other tenants/users

- [namespaces-bholt](https://btholt.github.io/complete-intro-to-containers/namespaces)
- [shell scripts](https://github.com/btholt/projects-for-complete-intro-to-containers/tree/master/namespaces) for creating a namespace for change rooted envs

### cgroups

Allocate resources to the chroot'd, namespaced environments so that tenants don't hog each others resources. Namespaces give you process level isolation in the chroot'd env, the tenants of another env can still hog up resources like CPU, RAM. Google came up with this.

- [cgroups-bholt](https://btholt.github.io/complete-intro-to-containers/cgroups)
- [shell scripts](https://github.com/btholt/projects-for-complete-intro-to-containers/tree/master/cgroups)

## Docker Image

pre-made containers are called images

- [docker images without docker-bholt](https://btholt.github.io/complete-intro-to-containers/docker-images-without-docker)
- [shell scripts](https://github.com/btholt/projects-for-complete-intro-to-containers/tree/master/docker-images-without-docker)

- [docker images with docker](https://btholt.github.io/complete-intro-to-containers/docker-images-with-docker)
- Kill all running containers: `docker kill $(docker ps -q)`

### Dockerfile

A set of instructions to docker on how to build your container

- `docker run --init --rm --publish 3000:3000 node-app:1.0.0`: node, doesn't understand SIGTERM or SIGINT, terminate and interrupt.
  - Problem: can't stop the server, docker listens but node deosn't
  - Solution: running with `--init` (handled by a package called tini) handles the termintaion/interrupt signals
  - `--publish`: maps the container port to the host's port so that the server can listen

- `EXPOSE` instruction, flag requred when using this, -P
  - `docker run --init --rm -P node-app:1.0.0`: randomnly pick ports from the conatiner and map it to port 3000
  - better run: `docker run --init --detach -p 3000:3000 node-app:1.0.0` (--detach: run container in the background, -p is same as --publish)

- `docker build -t <tagName> -f <dockerfileName>`: We can our custom dockerfile, named, *tagName.Dockerfile* ex: node-alpine.Dockerfile

### Layers

Docker is smart enough to see the your FROM, RUN, and WORKDIR instructions haven't changed and wouldn't change if you ran them again so it uses the same containers it cached from the previous but it can see that your COPY is different since files changed between last time and this time, so it begins the build process there and re-runs all instructinos after that.

- Here, some problems occur, the install step (RUN npm ci) takes the most time and dockdr reruns all instructions from what it thniks has chnaged but in reality we chnageds something in our index file, which docker knows but we did nto chnage any dependencies. So for build performance, split *COPY into two COPY* instructions!
- ! this makes sure that we make use of docker's LAYER caching and keep the LAYER of installed packages!

### Bind Mounts

Run a container, without building it using a dockerfile, like a pre-built container (nginx) or say, I have a contianerized server that I am actively developing and I want the chnages to reflect in the contianer as I change it. *Sahre data between host and container*

ex: `docker run --mount type=bind,source="$(pwd)"/build,target=/usr/share/nginx/html -p 8080:80 nginx`

### Volumes

For persisting state between runs. Bind mounts are file systems managed by the host and shared with the container while volumes are managed by docker and mounted INTO the container. They can be shared, ex: databases

- `docker run --env DATA_PATH=/data/num.txt --mount type=volume,src=volume-mount-data,target=/data volume-mount`: send env vars to docker
- `docker prune volumes`: removes all local volumes
- `docker prune images`: removes all exited images

### Dev Containers in VS Code

- [Direct link](https://btholt.github.io/complete-intro-to-containers/visual-studio-code)

Uses bind mount so any changes being made inside the container is written to the host as well. So the regular commit flow can happen easily

### Docker Network

Network for conatiners to talk to each other

- `docker network create --driver=bridge node-hapi-net`: creates a docker network with that name
- `docker network ls` - list all the networks
- `docker run -d --network=node-hapi-net -p 27017:27017 --name=db --rm mongo:3`: run the image mongo:3 (container) in the background and publish to PORT 27017 with name `db` (allows us to specifically refer to this container and use this as address on the network), `--rm` because when mongo conatiner exits, it doesn't get rid of all the logs and metadata until we tell it to
- `docker run -it --network=node-hapi-net --rm mongo:3 mongo --host db`: run mogo3 image and run the mongo client in the conatner; So we have 2 mongo containers, one running the server `mongod` and the other running the client

- a volume could be mounted to the `db` conatainer and mongo can be configured to read off of and write to that volume between runs
- `docker run --init -p 3000:3000 --network=node-hapi-net --env MONGO_CONNECTION_STRING=mongodb://db:27017 netwroking-mongo-app`: run the `networking-mongo-app` on port 3000, connect to `node-hapi-network`, set env var for the container (note we refer to the database conatiner by the name we gave, `db`)

### Docker Compose

Run multiple conatiners with one command, `docker-compose up`, without worrying about manualy setting up network

- `docker-compose up --build`: rebuild the images (when you have changed any of the docker files)
- `docker-compose up --scale web=10`: spin up 10 instances of the web container; This requires a smarter way to allocate ports for conatainers, load balancing should help

### Kubernetes

Container Orchestration tool

- *Master*: the brain, controls everything else
- *Nodes*: do the actual work, house 1:N containers, manage workloads; can also be looked at as deploy target, a VM, another container, bare metal server
- *Pods*: 2 to N interdependent containers deployed as one
- *Service*: A groiup of Pods making jup one service, like a shopping cart service. All these pods talk to each other and services ensure the connection between these pods is relaible since we create and destroy pods on the fly depending on scale
- *Deployment*: tell K8s in what state you want the pods should be in

## Miscelleneous but important

- **CMD and ENTRYPOINT**
  - cli params passed to `docker run` are replaced entirely vs appendage
  - use BOTH if you want a default value when no cli args are passed in (ENTRYPOINT will come before CMD; Order matters)

## Source

- [Notes; bholt](https://btholt.github.io/complete-intro-to-containers)
- [Shell Scripts](https://github.com/btholt/complete-intro-to-containers)
- [Mini projects](https://github.com/btholt/projects-for-complete-intro-to-containers)
