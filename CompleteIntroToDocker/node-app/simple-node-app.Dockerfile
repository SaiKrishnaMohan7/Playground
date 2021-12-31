FROM node:12-stretch

# just a generic username, this is provided by node:12-stretch
# bad practice to run things as root user
USER node

# Create a working dir, good practice
# node is the home dir of the node user
WORKDIR /home/node/sai-node-code

# copy index.js from host to container owned by `user` node in group `node`
COPY --chown=node:node index.js /home/node/sai-node-code/index.js

CMD ["node", "/home/node/sai-node-code/index.js"]