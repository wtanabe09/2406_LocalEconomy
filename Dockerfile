FROM node:18.17-alpine
WORKDIR /app/
COPY ./package.json /app/
RUN npm install
