# ⚠️ TODAS LAS PRE-ENTREGAS ESTÁN DIVIDIDAS POR RAMAS EN ESTE REPOSITORIO

> **Nota para la corrección:** Cada pre-entrega y avance progresivo del curso se encuentra versionado y estructurado en su propia rama dentro de este repositorio de GitHub.

---

# 🚀 API de Gestión de Servicios y Reservas - Sistema de Turnos

API REST y servidor con vistas en tiempo real desarrollado con Node.js, Express, **Zod**, **MongoDB Atlas con Mongoose**, **Handlebars** y **Socket.io**, implementando una **arquitectura en capas desacoplada** con consultas avanzadas (paginación, filtros, ordenamiento), validación en capa de middleware y relaciones mediante `populate`.

---

## 🏛️ Arquitectura en Capas

```text
Router → Middleware de Validación (Zod) → Controller → Service → Repository → DAO → MongoDB Atlas (Mongoose)
```

| Capa | Ubicación | Responsabilidad |
| :--- | :--- | :--- |
| **Router** | `src/routes/` | Define los endpoints y conecta los middlewares de validación con los controladores. |
| **Middleware / Validator** | `src/middleware/` & `src/validators/` | Valida esquemas con **Zod** cortando el flujo con `400 Bad Request` antes de invocar la lógica de negocio o la base de datos. |
| **Controller** | `src/controllers/` | Procesa peticiones HTTP (`params`, `query`, `body`), invoca a los Services y responde con `res.status().json()` o `res.render()`. |
| **Service** | `src/services/` | Contiene reglas de negocio (incremento de cantidad en reservas, validación de existencia cruzada, protección de ID). Desconoce `req` y `res`. |
| **Repository** | `src/repositories/` | Abstracción de acceso a datos sin reglas de negocio (`getAll`, `getById`, `create`, `update`, `delete`). |
| **DAO** | `src/dao/` | Consultas Mongoose directas a colecciones de MongoDB Atlas (`find`, `countDocuments`, `populate`, `findByIdAndUpdate`, etc.). |
| **Models** | `src/models/` | Esquemas de Mongoose (`service.model.js`, `booking.model.js`, `message.model.js`). |

---

## 🔍 Consultas Avanzadas en Servicios (`GET /api/services`)

El endpoint admite combinación de parámetros query para filtrado, paginación y ordenamiento:

### Parámetros Query Soportados
* `category`: Filtra por categoría (búsqueda insensible a mayúsculas/minúsculas).
* `available`: Filtra por disponibilidad (`true` o `false`).
* `page`: Número de página actual (por defecto: `1`).
* `limit`: Cantidad de resultados por página (por defecto: `10`).
* `sortBy`: Campo de ordenamiento (ej: `price`, `name`, `createdAt`).
* `order`: Sentido del orden (`asc` para ascendente o `desc` para descendente).

#### Ejemplo de Petición
```http
GET /api/services?category=Salud&available=true&page=1&limit=5&sortBy=price&order=asc
```

#### Ejemplo de Respuesta con Metadatos de Paginación
```json
{
  "status": "success",
  "totalResults": 12,
  "page": 1,
  "limit": 5,
  "totalPages": 3,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2,
  "results": [
    {
      "id": "671457f920da08e8b61c9e01",
      "_id": "671457f920da08e8b61c9e01",
      "name": "Consulta Clínica",
      "description": "Atención médica básica",
      "duration": "30 minutos",
      "price": 3000,
      "category": "Salud",
      "available": true
    }
  ]
}
```

---

## 🛡️ Validación de Datos con Zod

Las validaciones cortan la petición **antes de que los datos alcancen la base de datos**. Si algún campo no cumple las reglas, se devuelve inmediatamente un código `400 Bad Request` con el detalle de los errores.

### Esquemas Aplicados
1. **Creación de Servicio (`POST /api/services`)**:
   - `name`: string obligatorio (mínimo 2 caracteres).
   - `description`: string obligatorio (mínimo 3 caracteres).
   - `duration`: string obligatorio.
   - `price`: número positivo mayor a 0.
   - `category`: string obligatorio (mínimo 2 caracteres).
   - `available`: booleano (opcional, default `true`).
2. **Actualización de Servicio (`PUT /api/services/:sid`)**:
   - Campos opcionales pero con las mismas reglas de tipo; no permite modificar el `_id`.
3. **Creación de Reserva (`POST /api/bookings`)**:
   - `clientName`: string obligatorio (mínimo 2 caracteres).
   - `clientEmail`: email válido obligatorio.
   - `date`: string de fecha obligatorio.
   - `time`: string de hora obligatorio.
   - `status`: enum (`pending`, `confirmed`, `cancelled`, `completed`).
4. **Agregar Servicio a Reserva (`POST /api/bookings/:bid/services/:sid`)**:
   - Valida que tanto `bid` como `sid` sean `ObjectId` válidos de 24 caracteres hexadecimales antes de interactuar con MongoDB.

#### Ejemplo de Error de Validación (`400 Bad Request`)
```json
{
  "status": "error",
  "message": "Error de validación en los datos enviados",
  "errors": [
    {
      "field": "clientEmail",
      "message": "Debe ser un email válido (ej: cliente@dominio.com)"
    },
    {
      "field": "price",
      "message": "El precio debe ser un número positivo mayor a 0"
    }
  ]
}
```

---

## 🔗 Relaciones con Referencia y Populate en Reservas

En la colección de MongoDB, las reservas almacenan únicamente referencias con `ObjectId`:
```json
{
  "services": [
    {
      "service": "671457f920da08e8b61c9e01",
      "quantity": 2
    }
  ]
}
```

Al consultar `GET /api/bookings/:bid`, Mongoose ejecuta `.populate("services.service")`, reemplazando el ID por el objeto completo del servicio:

#### Ejemplo de Consulta (`GET /api/bookings/:bid`)
```json
{
  "id": "671458b220da08e8b61c9e10",
  "_id": "671458b220da08e8b61c9e10",
  "clientName": "Ana Gómez",
  "clientEmail": "ana.gomez@example.com",
  "date": "2026-10-25",
  "time": "16:00",
  "status": "pending",
  "services": [
    {
      "service": {
        "_id": "671457f920da08e8b61c9e01",
        "name": "Fisioterapia",
        "description": "Sesión de rehabilitación",
        "duration": "45 minutos",
        "price": 4500,
        "category": "Kinesiología",
        "available": true
      },
      "quantity": 2
    }
  ]
}
```

---

## 📁 Estructura del Proyecto

```text
src/
  config/
    db.config.js
    env.config.js
  controllers/
    bookings.controller.js
    services.controller.js
    views.controller.js
  dao/
    bookings.dao.js
    services.dao.js
  middleware/
    rotingDetector.js
    validate.middleware.js
  models/
    booking.model.js
    message.model.js
    service.model.js
  public/
    css/styles.css
    js/socket.js
  repositories/
    bookings.repository.js
    services.repository.js
  routes/
    bookings.router.js
    services.router.js
    views.router.js
  services/
    bookings.service.js
    services.service.js
  validators/
    booking.validator.js
    service.validator.js
  views/
    layouts/main.handlebars
    availability.handlebars
    services.handlebars
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
