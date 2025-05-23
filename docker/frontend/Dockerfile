FROM node:18-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY ./frontend/package*.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY ./frontend .

EXPOSE 3000

# Démarrer l'application en mode développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]