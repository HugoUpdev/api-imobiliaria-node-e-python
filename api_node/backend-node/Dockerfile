# Usa imagem oficial do Node.js
FROM node:18

# Cria o diretório de trabalho
WORKDIR /app

# Copia o package.json e package-lock.json (se tiver)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o restante da aplicação
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
