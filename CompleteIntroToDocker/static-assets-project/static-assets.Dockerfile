FROM node:12-stretch AS buildStage

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

# Serve stage
FROM nginx:1.17

COPY --from=buildStage /app/build /usr/share/nginx/html
