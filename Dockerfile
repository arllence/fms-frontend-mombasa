FROM node:16.17.1-alpine as build-step
RUN mkdir /src
WORKDIR /src
COPY package.json ./
COPY . /src/
RUN npm install
RUN npm run build
FROM nginx:1.22.1-alpine as prod-stage
RUN rm -rf /home/*
COPY --from=build-step /src/dist/coreui-free-angular-admin-template/ /home/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
# docker exec -it ngedmsfrontend sh
# docker exec -it nginxedmsfrontend sh
