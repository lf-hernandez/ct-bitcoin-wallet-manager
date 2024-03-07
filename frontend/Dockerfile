FROM node:latest as build

WORKDIR /app/
COPY . /app/

RUN npm install
RUN npm run build

FROM ubuntu:latest
RUN apt-get update && apt-get install nginx -y

COPY --from=build /app/dist /var/www/html/

EXPOSE 80
CMD ["nginx","-g","daemon off;"]