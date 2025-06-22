FROM node:20

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm install @google/generative-ai

CMD ["npm", "run", "dev"]
