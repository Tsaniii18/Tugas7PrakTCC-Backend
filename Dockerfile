FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production 
COPY . .
RUN npm install
EXPOSE 8081
CMD ["node", "index.js"]