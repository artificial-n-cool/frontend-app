# BASE IMAGE with an alias #
FROM node:18-alpine as build
WORKDIR /app

# Install Angular CLI to run Build #
RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

# BASE IMAGE with an alias #
FROM nginx as runtime

# Copy contents from the other container with alias "build" #
# onto the specified path in the current container#
COPY --from=build /app/dist/* /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx","-g","daemon off:"]