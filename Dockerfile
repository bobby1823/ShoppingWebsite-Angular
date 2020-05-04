### STAGE 1: Build ###
FROM node:10.20.1-alpine3.10 AS build
WORKDIR /app/
#WORKDIR /
COPY package.json /app/
RUN npm install
COPY . /app/
RUN npm run build

### STAGE 2: Run ###
#FROM nginx:1.17.1-alpine
#COPY --from=build /home/poc-docker/sayanta-docker/angular-app-frontend/docker-frontend-volume/dist/ShoppingWebsite-Angular /usr/share/nginx/html
