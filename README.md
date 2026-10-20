# ⚠️ TODAS LAS PRE-ENTREGAS ESTÁN DIVIDIDAS POR RAMAS EN ESTE REPOSITORIO

> **Nota para la corrección:** Cada pre-entrega y avance progresivo del curso se encuentra versionado y estructurado en su propia rama dentro de este repositorio de GitHub.

---

# 🚀 API de Gestión de Servicios y Reservas - Sistema de Turnos

API REST desarrollada con Node.js, Express y **MongoDB Atlas con Mongoose**, que gestiona los recursos de **servicios**, **reservas** y **mensajes**, estructurada bajo una **arquitectura en capas con DAO y Repository**.

---

## 🏛️ Arquitectura en Capas

El flujo de información en la aplicación desacopla por completo la lógica de negocio del motor de persistencia:

```text
Router → Controller → Service → Repository → DAO → MongoDB Atlas (Mongoose)
```

| Capa | Ubicación | Responsabilidad |
| :--- | :--- | :--- |
| **Router** | `src/routes/` | Define los endpoints y los asocia a las funciones del controller. |
| **Controller** | `src/controllers/` | Recibe las peticiones HTTP (`params`, `query`, `body`), invoca a la capa Service y responde al cliente con `res.status().json()`. |
| **Service** | `src/services/` | Contiene todas las reglas de negocio (validación cruzada, incremento de cantidad en servicios de reservas, etc.). Desconoce `req` y `res`. |
| **Repository** | `src/repositories/` | Provee métodos estándar de acceso a datos (`getAll`, `getById`, `create`, `update`, `delete`) sin contener reglas de negocio. |
| **DAO** | `src/dao/` | Realiza las consultas directas a las colecciones de MongoDB Atlas utilizando los modelos de Mongoose. |
| **Models** | `src/models/` | Define los esquemas y modelos de datos de Mongoose (`service.model.js`, `booking.model.js`, `message.model.js`). |

---

## 🗄️ Modelos de Mongoose (`src/models/`)

1. **`service.model.js`**:
   - `name`: String (requerido)
   - `description`: String (requerido)
   - `duration`: String (requerido)
   - `price`: Number (requerido)
   - `category`: String (requerido)
   - `available`: Boolean (default: true)

2. **`booking.model.js`**:
   - `clientName`: String (requerido)
   - `clientEmail`: String (requerido)
   - `date`: String (requerido)
   - `time`: String (requerido)
   - `status`: String (default: "pending")
   - `services`: Referenciados mediante `ObjectId` con formato `[{ service: ObjectId, quantity: Number }]`

3. **`message.model.js`**:
   - `user`: String (requerido)
   - `message`: String (requerido)
   - `timestamp`: Date (default: Date.now)

---

## 📁 Estructura del Proyecto

```text
src/
  config/
    db.config.js
    env.config.js
  controllers/
    services.controller.js
    bookings.controller.js
  dao/
    services.dao.js
    bookings.dao.js
  middleware/
    rotingDetector.js
  models/
    service.model.js
    booking.model.js
    message.model.js
  repositories/
    services.repository.js
    bookings.repository.js
  routes/
    services.router.js
    bookings.router.js
  services/
    services.service.js
    bookings.service.js
  app.js
  server.js
package.json
.env.example
.gitignore
README.md
```

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
   MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
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
| **GET** | `/api/services` | Devuelve todos los servicios de la base de datos (acepta filtros `?category=...`, `?available=true\|false`). | `200 OK`, `500 Internal Server Error` |
| **GET** | `/api/services/:sid` | Devuelve un servicio por su `ObjectId`. | `200 OK`, `404 Not Found` |
| **POST** | `/api/services` | Crea un servicio en MongoDB Atlas. | `201 Created`, `400 Bad Request` |
| **PUT** | `/api/services/:sid` | Actualiza un servicio sin permitir modificar su `_id`. | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/api/services/:sid` | Elimina un servicio de la base de datos. | `200 OK`, `404 Not Found` |

---

### 2. Reservas (`/api/bookings`)

| Método | Endpoint | Descripción | Códigos HTTP |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/bookings` | Devuelve todas las reservas con servicios poblados (`populate`). | `200 OK`, `500 Internal Server Error` |
| **GET** | `/api/bookings/:bid` | Devuelve una reserva específica con servicios poblados por su ID. | `200 OK`, `404 Not Found` |
| **POST** | `/api/bookings` | Crea una reserva (puede iniciarse con `services: []`). | `201 Created`, `400 Bad Request` |
| **POST** | `/api/bookings/:bid/services/:sid` | Agrega un servicio referenciado por `ObjectId` a una reserva existente (incrementa `quantity` si ya existe), validando que ambos existan. | `200 OK`, `404 Not Found` |
