ARG app_port
ARG debug_port

FROM node:12-alpine
RUN mkdir -p /app/server
WORKDIR /app/server
COPY . /app/server
RUN npm install -g typescript nodemon
RUN npm install
RUN npm run-script build
EXPOSE $app_port
EXPOSE $debug_port
CMD [ "npm", "start" ]
