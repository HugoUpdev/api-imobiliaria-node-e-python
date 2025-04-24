FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Dá permissão executável para arquivos binários do npm
RUN chmod -R 755 /app/node_modules/.bin

EXPOSE 8080

CMD ["npm", "run", "serve"]
