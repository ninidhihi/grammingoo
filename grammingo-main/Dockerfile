# 1: build the react application
FROM node:18 AS builder

# set working directory inside the container
WORKDIR /app

# copy package.json and package-lock.json
COPY package.json ./

# install dependencies
RUN npm install

# copy all source code
COPY . .

# build the react app
RUN npm run build

# 2: serve the application with nginx
FROM nginx:stable-alpine

# copy the built files from the prev stage
COPY --from=builder /app/build /usr/share/nginx/html

# copy the nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose the port
EXPOSE 80

# start the nginx server
CMD ["nginx", "-g", "daemon off;"]