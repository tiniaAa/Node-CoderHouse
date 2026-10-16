# 🚀 API de Gestión de Servicios y Reservas - Sistema de Turnos

API REST desarrollada con Node.js, Express y FileSystem que gestiona dos recursos principales — **servicios** y **reservas** — estructurada en tres capas (Routes, Controllers y Managers) con persistencia en archivos JSON.

---

## 📁 Estructura del Proyecto

```text
src/
  config/
    env.config.js
  controllers/
    services.controller.js
    bookings.controller.js
  data/
    services.json
    bookings.json
  managers/
    ServiceManager.js
    BookingManager.js
  middleware/
    rotingDetector.js
  routes/
    services.router.js
    bookings.router.js
  app.js
  server.js
package.json
.env.example
.gitignore
README.md
```

---

## 🏛️ Arquitectura en Capas

El proyecto está diseñado bajo el principio de separación de responsabilidades:
1. **Rutas (`src/routes/`)**: Definen los endpoints y los vinculan directamente con sus funciones controladoras correspondientes, sin lógica de negocio ni manejo directo de peticiones.
2. **Controladores (`src/controllers/`)**: Reciben los objetos `req` y `res`, procesan parámetros (`params`, `query`, `body`), delegan las operaciones a los managers y devuelven las respuestas con los códigos de estado HTTP apropiados (`200`, `201`, `400`, `404`, `500`).
3. **Managers (`src/managers/`)**: Contienen exclusivamente la lógica de negocio y persistencia en los archivos JSON (`services.json` y `bookings.json`) sin interacción con Express (`req`/`res`).

---

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

---

## 🚀 Ejecución

- **Modo desarrollo** (con recarga automática):
  ```bash
  npm run dev
  ```
- **Modo producción**:
  ```bash
  npm start
  ```
- **Tests**:
  ```bash
  npm test
  ```

---

## 📡 Endpoints de la API

### 1. Servicios (`/api/services`)

| Método | Endpoint | Descripción | Códigos HTTP |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/services` | Devuelve todos los servicios. Acepta filtros por query params (`?category=...`, `?available=true\|false`). | `200 OK`, `500 Internal Server Error` |
| **GET** | `/api/services/:sid` | Devuelve un servicio por su ID. | `200 OK`, `404 Not Found` |
| **POST** | `/api/services` | Crea un servicio con datos del body. El `id` se genera automáticamente. | `201 Created`, `400 Bad Request` |
| **PUT** | `/api/services/:sid` | Actualiza un servicio sin permitir modificar su `id`. | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/api/services/:sid` | Elimina un servicio por su `id`. | `200 OK`, `404 Not Found` |

#### Estructura del recurso `Service`:
```json
{
  "id": "277681f4-82c7-4c78-836b-b97c265b2913",
  "name": "Consulta Médica",
  "description": "Atención médica general",
  "duration": "30 minutos",
  "price": 3000,
  "category": "Salud",
  "available": true
}
```

---

### 2. Reservas (`/api/bookings`)

| Método | Endpoint | Descripción | Códigos HTTP |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/bookings` | Devuelve todas las reservas creadas. | `200 OK`, `500 Internal Server Error` |
| **GET** | `/api/bookings/:bid` | Devuelve una reserva específica por su ID. | `200 OK`, `404 Not Found` |
| **POST** | `/api/bookings` | Crea una reserva (puede iniciarse con `services: []`). | `201 Created`, `400 Bad Request` |
| **POST** | `/api/bookings/:bid/services/:sid` | Agrega un servicio a una reserva existente (incrementa `quantity` si ya existe), validando que ambos existan. | `200 OK`, `404 Not Found` |

#### Estructura del recurso `Booking`:
```json
{
  "id": "a9b8c7d6-1234-5678-90ab-cdef12345678",
  "clientName": "Juan Pérez",
  "clientEmail": "juan.perez@example.com",
  "date": "2026-10-20",
  "time": "14:30",
  "status": "pending",
  "services": [
    {
      "service": "277681f4-82c7-4c78-836b-b97c265b2913",
      "quantity": 1
    }
  ]
}
```