# ==============================
# 1️⃣ STAGE: Build
# ==============================
FROM node:20-alpine AS builder

# Define directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala dependencias
RUN npm ci

# Copia el código fuente
COPY . .

# Compila la aplicación para producción
RUN npm run build

# ==============================
# 2️⃣ STAGE: Production
# ==============================
FROM nginx:1.29-alpine AS production

# Copia los archivos estáticos generados por Vite al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Elimina la configuración por defecto y agrega una custom (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto de Nginx
EXPOSE 80

# ✅ HEALTHCHECK: verifica que el sitio responda correctamente
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80 || exit 1

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
