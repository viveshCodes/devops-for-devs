# Docker Guide!
Hi Devs! 
Welcome to the ultimate Docker Guide for the beginners. The documentation compiles the resources available on the internet and serves you a simplified guide to kick start your docker journey.


# What is Docker?

> Docker is an open source platform that enables developers to build, deploy, run, update and manage _containers_—standardized, executable components that combine application source code with the operating system (OS) libraries and dependencies required to run that code in any environment.

## Images and Containers
**Image:** Images are like blueprint for containers that contains the following:

  - Runtime environment
  - Application code
  - Any dependencies
  - Extra configuration (e.g. env variables)
  - Commands

It is pointed out that Image is read only. Once an image is created, it cannot be edited.

**Container:** Container is the running instance of an image. It runs our application.


## Installing Docker

We will focus installation on Linux machine because that is the place where real developers code, don't they?

For installing docker, please for the steps from the [official docker documentation](https://docs.docker.com/desktop/install/linux-install/#system-requirements).

## VMs vs Containers

| Virtual Machines (VMs)     | Containers | 
| :---        |    :----:   | 
| Virtual Machines have their own operating system.      | Containers share host's operating ystem.       | 
| They are typically slower.   | They are typically quicker.        | 

## Docker Images
Images are made up from several "layers". 

Typically, parent image is the first layer of the image. Parent image incudes the OS and sometimes the runtime environment. We get parent image from dockerhub.

Other layers of the image include:

1. source code
2. dependencies
3. run commands

## Pull Parent Image
We can get our desired parent image from dockerhub. To pull the parent image, we need to run the following command in the terminal:
``docker pull <PARENT_IMAGE_NAME>``

## Dockerfile for a node app
```
FROM node:17-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "app.js"]
```

Each instructions in the Dockerfile act as a layer of the Docker image.

## Build Docker Image
`` docker build -t <IMAGE_NAME>:<TAG> <RELATIVE_PATH_FOR_Dockerfile>``
For example,
```docker build -t api:api-v1 .```

## .dockerignore
When we create docker image, we ensure some folders like _node_modules_ are not copied. For that purpose we should add .dockerignore file.

## Create and run container from image
We can create container from an image and run it by issuing the following command:
``docker run --name <GIVE_NAME_TO_CONTAINER> <IMAGE_NAME>:<TAG>``

If your container has exposed PORT,
`` docker run --name <GIVE_NAME_TO_CONTAINER> -p <PORT_YOU_WANT_TO_MAP>:<PORT_EXPOSED_BY_CONTAINER> -d <IMAGE_NAME>:<TAG>``

The flag ``-d`` makes the terminal non-blocking.

## Layer caching
Docker creates container images using layers. Each command that is found in a Dockerfile creates a new layer. Each layer contains the filesystem changes to the image for the state before the execution of the command and the state after the execution of the command.
Docker uses a layer cache to optimize and speed up the process of building Docker images.

## Managing Images
- Show all images: ``docker image ls`` or ``docker images``
- Delete image
    ``docker image rm <IMAGE_NAME:TAG_NAME/IMAGE_ID>``
It must be noted that only those images can be deleted which are not being used by any containers by above method. It does not matter if the container is running or not. As long as there is instance of an image, we cannot delete that image with the command mentioned above.

    How to delete image which is being used by container?
    - Either delete the container and then delete the image or
    - run this command ``docker image rm <IMAGE_NAME:TAG_NAME/IMAGE_ID> --f``

## Handling containers
- Show all running container: ``docker container ls``
- Show all container: ``docker container ls -a``
- Start container: ``docker start <CONTAINER_ID/CONTAINER_NAME>``
- Stop container:``docker stop <CONTAINER_ID/CONTAINER_NAME>``
- Show all running processes: ``docker ps``
- Get process informations: ``docker ps -a``

    How to delete container?
    Only the stopped container can be deleted. So to delete a running container, the first step would be to stop that container and then proceed for deletion.
    
    The command to delete the container is:
    ``docker container rm <CONTAINER_NAME>``

- To start the container in nod-detach mode, use the tag ``-i`` as
    ``docker start -i <CONTAINER_ID/CONTAINER_NAME>``
- If we do not need the container after we stop it, we can add ``--rm`` flag before image name while creating and running a container:
`` docker run --name <GIVE_NAME_TO_CONTAINER> -p <PORT_YOU_WANT_TO_MAP>:<PORT_EXPOSED_BY_CONTAINER> --rm <IMAGE_NAME>:<TAG>``

## Prune system
To remove:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container associated to them
  - all build cache
  
we can hit the below command
``docker system prune -a``

## Volumes
Volumes are used to map folders on our computer to folders in the container.
We have to add ``-v`` flag to setup volume while creating and running container.

`` docker run --name <GIVE_NAME_TO_CONTAINER> -p <PORT_YOU_WANT_TO_MAP>:<PORT_EXPOSED_BY_CONTAINER> --rm -v <ABSOLUTE_PATH_OF_FOLDER_ON_LOCAL_SYSTEM_TO_MAP> <IMAGE_NAME>:<TAG>``

After first volume we need to add another volume flag specifying folder in the container which generally containes packages/modules.

`` docker run --name <GIVE_NAME_TO_CONTAINER> -p <PORT_YOU_WANT_TO_MAP>:<PORT_EXPOSED_BY_CONTAINER> -v <ABSOLUTE_PATH_OF_FOLDER_ON_LOCAL_SYSTEM_TO_MAP>:<WORKDIR_OF_CONTAINER> -v <PATH_FOR_PACKAGE/MODULES_FOLDER> <IMAGE_NAME>:<TAG>``

e.g.
``docker run --name api-c -p 5000:5000 --rm -v C:\Users\vives\LetsGo\docker\api:/app -v /app/node_modules  api:v1 
``

## Docker Compose
Docker Compose is a tool that was developed to help define and share multi-container applications. With Compose, we can create a YAML file to define the services and with a single command, can spin everything up or tear it all down. - [Docker Compose](https://docs.docker.com/get-started/08_using_compose/)

Docker compose up:
``docker-compose up``

Docker compose down:
``docker-compose down``

Docker compose down and remove images and volumes created by docker compose:
``docker-compose down --rmi all -v``

An example of ``docker-compose.yaml`` file is,
```
version: "3.84"
services:
  api:
    build: ./api
    container_name: api_c
    ports:
      - '5000:5000'
    volumes:
      - ./api:/app
      - /app/node_modules
```















