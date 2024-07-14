# Usa la imagen oficial de Node.js como base
FROM node

# Establece el directorio de trabajo en el contenedor
WORKDIR /server

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 8080

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]