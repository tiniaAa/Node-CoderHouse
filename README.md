Acá tenés el `README.md` estructurado en base a los archivos que me compartiste:

```markdown
# 🚀 API de Gestión de Servicios

## 📖 Descripción
El proyecto es un sistema desarrollado en Node.js que gestiona servicios a través de una clase llamada `ServiceManager`. Permite listar, buscar por ID, agregar, actualizar y eliminar servicios almacenados en un arreglo en memoria.

## ⚙️ Cómo instalar
* Clona el repositorio en tu computadora.
* El proyecto requiere la instalación del módulo `dotenv` para el manejo de las variables de entorno.
* No necesitas instalar librerías de terceros para la generación de IDs o mensajes por consola, ya que utiliza los módulos nativos `crypto` y `console` de Node.

## 🚀 Cómo ejecutar
* Instancia la clase principal importando `ServiceManager` desde su archivo correspondiente[cite: 3].
* Ejecuta tu archivo principal mediante Node.js en la terminal.

## 🔐 Variables de entorno necesarias
* El sistema utiliza `dotenv.config()` para cargar configuraciones al inicio de la aplicación.
* Se requiere configurar un archivo `.env` que contenga las variables `PORT` y `NODE_ENV`.
* Existe una validación estricta que recorre el objeto de configuración. 
.

## 📦 Descripción del recurso "Services"
Cada servicio se almacena como un objeto dentro de un arreglo y contiene estrictamente la siguiente estructura:
* **`id`**: Es un identificador autogenerado a través del método `crypto.randomUUID()`.
* **`name`**: Nombre o título del servicio.
* **`description`**: Breve descripción de lo que ofrece el servicio.
* **`duration`**: Tiempo que toma realizar el servicio.
* **`price`**: Costo o valor del servicio.
* **`category`**: Categoría a la que pertenece.
* **`available`**: Estado de disponibilidad.

## 🛠️ Ejemplos de uso de los métodos

* **`getServices()`**: 
  * Retorna el arreglo completo con todos los servicios guardados.

* **`getServicesById(id)`**: 
  * Recibe un identificador único y busca en el arreglo el servicio cuyo `id` coincida con el parámetro ingresado.

* **`addService(serviceData)`**:
  * Recibe un objeto con los datos del servicio a crear.
  * Valida que las propiedades `name`, `description`, `duration`, `price`, `category` y `available` no sean nulas o indefinidas.
  * Si detecta datos faltantes, arroja automáticamente un error indicando "Campos incompletos".
  * Genera el ID único de forma automática y guarda el nuevo servicio.

* **`updateService(id, data)`**:
  * Recibe el `id` del servicio a modificar y un objeto `data` con la nueva información.
  * Valida si el servicio existe previamente.
  * Utiliza el operador `??` para modificar los campos (`name`, `description`, `price`, `availtable`), conservando el valor que el servicio ya tenía en caso de que en `data` vengan valores nulos o indefinidos.

* **`deleteService(name)`**:
  * Recibe el nombre del servicio a eliminar.
  * Utiliza el método `findIndex` para ubicarlo y `splice` para retirarlo de manera definitiva del arreglo.
  * Retorna el objeto eliminado en caso de éxito, o `null` si no lo encuentra.

```