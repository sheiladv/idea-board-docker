# ==============================
# 1️⃣ STAGE: Build
# ==============================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ==============================
# 2️⃣ STAGE: Production
# ==============================
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

# Expone el puerto de la aplicación
EXPOSE 3000

# ✅ HEALTHCHECK: comprueba si el endpoint responde
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Comando de inicio
CMD ["node", "dist/main.js"]
