FROM node:16.17.1-alpine as build-step
WORKDIR /src

# Copy package and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . /src/
RUN npm run build

# Stage 2: Nginx for serving app
FROM nginx:1.22.1-alpine as prod-stage

# Remove default config
RUN rm -rf /etc/nginx/conf.d/*

# Copy Nginx config
COPY --from=build-step /src/config/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app
RUN rm -rf /home/*
COPY --from=build-step /src/dist/ /home/

# Copy SSL certs
COPY --from=build-step /src/certs/ /etc/nginx/certs/

# Expose HTTP and HTTPS
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
