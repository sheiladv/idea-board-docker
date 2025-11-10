# --- Etapa 1: Build de la aplicación ---
FROM node:20-alpine AS build

# Directorio de trabajo
WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# --- ARG para la URL del backend ---
ARG VITE_API_URL=http://localhost:3000

# Compilamos la app con Vite
RUN npm run build

# --- Etapa 2: Servir con Nginx ---
FROM nginx:stable-alpine

# Copiamos el build generado
COPY --from=build /app/dist /usr/share/nginx/html

# Eliminamos la configuración default y exponemos el puerto
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]
