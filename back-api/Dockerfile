FROM node:10

WORKDIR /usr/src/app/back-api

COPY package*.json ./

RUN npm install

EXPOSE 3088

CMD ["npm", "run", "dev"]