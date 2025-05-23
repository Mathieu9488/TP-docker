FROM node:18-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY ./api/package*.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY ./api .

EXPOSE 5000

# Utiliser nodemon pour le hot reload
CMD ["npm", "run", "dev"]