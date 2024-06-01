FROM node:20.13.1-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD [ "npm", "run", "start:dev" ]