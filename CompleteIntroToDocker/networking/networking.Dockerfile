FROM node:12-stretch

RUN npm i -g nodemon

USER node

# WORKDIR creates this dir as the root user and not USER node, so we create the folder as the USER node
RUN mkdir /home/node/code

WORKDIR /home/node/code

# copy package.json and package-lock.json into the conatiner so that we don't have to run install everytime something in the filesystem chnages (eg: we changed index.js, this results in insatall running again as these's some change in the file system)
COPY --chown=node:node package-lock.json package.json ./

# npm ci - install from package-lock.json
RUN npm ci

# Copy everything from host to container
COPY --chown=node:node . .

CMD ["nodemon", "index.js"]