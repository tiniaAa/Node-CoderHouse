# 🚀 API de Gestión de Servicios - Turnos y Reservas

API REST desarrollada con Node.js y Express para la gestión de servicios dentro del Sistema de Turnos y Reservas.

## 📁 Estructura del Proyecto

```text
src/
  config/
    env.config.js
  managers/
    ServiceManager.js
  routes/
    services.router.js
  app.js
  server.js
package.json
.env.example
.gitignore
README.md
```

## ⚙️ Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Node-CoderHouse
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz tomando como base `.env.example`:
   ```env
   PORT=3000
   NODE_ENV=development
   ```

## 🚀 Ejecución

- Modo desarrollo (con recarga automática):
  ```bash
  npm run dev
  ```
- Modo producción:
  ```bash
  npm start
  ```

---

## 📡 Endpoints de la API

La ruta base para los servicios es `/api/services`.

| Método | Endpoint | Descripción | Códigos HTTP |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/services` | Obtiene todos los servicios. Admite filtros por query params (`?category=...`, `?available=true\|false`). | `200 OK`, `500 Internal Server Error` |
| **GET** | `/api/services/:sid` | Obtiene un servicio específico por su ID (`sid`). | `200 OK`, `404 Not Found` |
| **POST** | `/api/services` | Crea un nuevo servicio. El `id` se genera automáticamente. | `201 Created`, `400 Bad Request` |
| **PUT** | `/api/services/:sid` | Actualiza los datos de un servicio sin permitir modificar su `id`. | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/api/services/:sid` | Elimina un servicio por su `id`. | `200 OK`, `404 Not Found` |

### 📝 Estructura del recurso "Service"

```json
{
  "id": "e2f11c79-b1d5-455b-bf78-efca05c4cb84",
  "name": "Consulta Médica",
  "description": "Atención médica general",
  "duration": 30,
  "price": 3000,
  "category": "Salud",
  "available": true
}
```