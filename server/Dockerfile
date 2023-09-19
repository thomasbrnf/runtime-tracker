FROM node:18

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm i -g pkg

CMD [ "npm", "run", "start:dev" ]
