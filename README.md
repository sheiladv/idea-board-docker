# 💡 Idea Board - Proyecto Docker

Bienvenido! Este mini-proyecto es una aplicación full-stack desarrollada con el propósito de explorar y aprender Docker, ~yay!

## 📋 Descripción

Idea Board permite a los usuarios crear y gestionar ideas para luego proponerlas a la empresa. El proyecto está diseñado como un ejemplo para demostrar:

- Containerización de aplicaciones con Docker
- Orquestación de múltiples servicios con Docker Compose
- Configuración de entornos de desarrollo y producción
- Comunicación entre contenedores mediante redes Docker
- Persistencia de datos con volúmenes Docker
- Multi-stage builds para optimización de imágenes

## 🏗️ Arquitectura

Compuesto por tres servicios principales:

- **Frontend**: Aplicación React con Vite
- **Backend**: API REST con NestJS
- **Database**: PostgreSQL 15

## 🛠️ Tecnologías

### Frontend

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Axios** - Cliente HTTP

### Backend

- **NestJS 11** - Framework Node.js
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Base de datos relacional

### DevOps

- **Docker** - Containerización
- **Docker Compose** - Orquestación de servicios

## 📁 Estructura del Proyecto

```
idea-board/
├── backend/
│   └── idea-board-backend/
|       |        # No hagan esto! una carpeta dentro de otra...
│       ├── src/
│       │   ├── ideas/          # Módulo de ideas
│       │   ├── app.module.ts
│       │   └── main.ts
│       ├── Dockerfile           # Producción
│       ├── Dockerfile.dev       # Desarrollo
│       └── package.json
├── frontend/
│   └── idea-board-frontend/
│       ├── src/
|       |        # No hagan esto! una carpeta dentro de otra...
│       │   ├── components/
│       │   ├── App.jsx
│       │   └── api.js
│       ├── Dockerfile           # Producción
│       ├── Dockerfile.dev       # Desarrollo
│       └── package.json
├── docker-compose.yml           # Configuración producción
└── docker-compose.dev.yml       # Configuración desarrollo
```

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/get-started) (versión 20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versión 2.0 o superior)

## 🚀 Instalación y Uso

### Desarrollo

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd idea-board
   ```

2. **Configurar variables de entorno**

   Crea un archivo `.env.dev` en `backend/idea-board-backend/` con el siguiente contenido:

   ```env
   # Database
   DB_HOST=db
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=idea_board

   # Backend
   PORT=3000
   NODE_ENV=development
   ```

3. **Iniciar los servicios en modo desarrollo**

   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

   Los servicios estarán disponibles en:

   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000
   - Database: localhost:5432

4. **Detener los servicios**
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```
   ~Agrega '-v' para borrar volumenes! (Mucho cuidado)
   ```bash
   docker-compose -f docker-compose.dev.yml down -v
   ```

### Producción

1. **Configurar variables de entorno**

   Crea un archivo `.env` en `backend/idea-board-backend/` con el siguiente contenido:

   ```env
   # Database
   DB_HOST=db
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=idea_board

   # Backend
   PORT=3000
   NODE_ENV=production
   ```

2. **Construir e iniciar los servicios**

   ```bash
   docker-compose up --build -d
   ```

   Los servicios estarán disponibles en:

   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

3. **Ver logs**

   ```bash
   docker-compose logs -f
   ```

4. **Detener los servicios**

   ```bash
   docker-compose down
   ```

## 🐳 Características de Docker Implementadas

### Multi-stage Builds

- **Backend**: Build optimizado en dos etapas (builder + runtime)
- **Frontend**: Build con Vite y servido con Nginx

### Volúmenes

- Persistencia de datos de PostgreSQL
- Hot reload en desarrollo mediante volúmenes bind mount

### Redes

- Red compartida (`idea-net`) para comunicación entre servicios
- Aislamiento de servicios mediante redes Docker

### Variables de Entorno

- Configuración mediante archivos `.env`
- Separación entre entornos de desarrollo y producción

### Dependencias entre Servicios

- Orquestación con `depends_on` en Docker Compose
- Inicio ordenado de servicios (db → backend → frontend)

## 📝 Comandos Útiles

### Desarrollo

```bash
# Iniciar servicios
docker-compose -f docker-compose.dev.yml up

# Iniciar en segundo plano
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Reconstruir imágenes
docker-compose -f docker-compose.dev.yml up --build

# Detener servicios
docker-compose -f docker-compose.dev.yml down
```

### Producción

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver estado de servicios
docker-compose ps

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

### Limpieza

```bash
# Eliminar contenedores, redes y volúmenes
docker-compose down -v

# Eliminar imágenes no utilizadas
docker image prune -a

# Limpieza completa del sistema Docker
docker system prune -a --volumes
```

## 🔍 Inspección de Contenedores

```bash
# Listar contenedores en ejecución
docker ps

# Ver logs de un contenedor específico
docker logs idea-board-backend
docker logs idea-board-frontend
docker logs idea-board-db

# Ejecutar comandos dentro de un contenedor
docker exec -it idea-board-backend sh
docker exec -it idea-board-db psql -U postgres -d idea_board
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún problema o tienes sugerencias, no dudes en abrir un issue o crear un pull request.

---

**Nota**: Este proyecto es meramente educativo y está diseñado para demostrar conceptos de Docker. Para uso en producción, se recomienda implementar medidas de seguridad adicionales, configuración de SSL/TLS, y mejores prácticas de seguridad.
