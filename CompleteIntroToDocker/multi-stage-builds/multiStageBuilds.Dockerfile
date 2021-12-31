# build stage, 0, this container won't be shipped so it's fine if its bulky. We just use it for our build stage
FROM node:12-stretch AS build

# Doesn't matter if owned by root
WORKDIR /build

# Doesn't matter if owned by root
COPY package.json package-lock.json ./

RUN npm ci

COPY . .


# runtime stage, 1
FROM alpine:3.10

# We have removed npm (my-own-node-alpine.Dockerfile) as we don't need in this stage
RUN apk add --update nodejs-current

# Create a new group and new user
RUN addgroup -S node && adduser -S node -G node

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

# Copy from the first stage, if not specified, copy from host machine
COPY --from=build --chown=node:node /build .

CMD ["node", "index.js"]