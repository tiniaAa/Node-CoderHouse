Acá tenés el `README.md` estructurado en base a los archivos que me compartiste:

```markdown
# 🚀 API de Gestión de Servicios

## 📖 Descripción
El proyecto es un sistema desarrollado en Node.js que gestiona servicios a través de una clase llamada `ServiceManager`[cite: 2]. Permite listar, buscar por ID, agregar, actualizar y eliminar servicios almacenados en un arreglo en memoria[cite: 2].

## ⚙️ Cómo instalar
* Clona el repositorio en tu computadora.
* El proyecto requiere la instalación del módulo `dotenv` para el manejo de las variables de entorno[cite: 1].
* No necesitas instalar librerías de terceros para la generación de IDs o mensajes por consola, ya que utiliza los módulos nativos `crypto` y `console` de Node[cite: 2].

## 🚀 Cómo ejecutar
* Instancia la clase principal importando `ServiceManager` desde su archivo correspondiente[cite: 3].
* Ejecuta tu archivo principal mediante Node.js en la terminal.

## 🔐 Variables de entorno necesarias
* El sistema utiliza `dotenv.config()` para cargar configuraciones al inicio de la aplicación[cite: 1].
* Se requiere configurar un archivo `.env` que contenga las variables `PORT` y `NODE_ENV`[cite: 4].
* Existe una validación estricta que recorre el objeto de configuración[cite: 1]. 
[cite: 1].

## 📦 Descripción del recurso "Services"
Cada servicio se almacena como un objeto dentro de un arreglo y contiene estrictamente la siguiente estructura:
* **`id`**: Es un identificador autogenerado a través del método `crypto.randomUUID()`[cite: 2].
* **`name`**: Nombre o título del servicio[cite: 2].
* **`description`**: Breve descripción de lo que ofrece el servicio[cite: 2].
* **`duration`**: Tiempo que toma realizar el servicio[cite: 2].
* **`price`**: Costo o valor del servicio[cite: 2].
* **`category`**: Categoría a la que pertenece[cite: 2].
* **`available`**: Estado de disponibilidad[cite: 2].

## 🛠️ Ejemplos de uso de los métodos

* **`getServices()`**: 
  * Retorna el arreglo completo con todos los servicios guardados[cite: 2].

* **`getServicesById(id)`**: 
  * Recibe un identificador único y busca en el arreglo el servicio cuyo `id` coincida con el parámetro ingresado[cite: 2].

* **`addService(serviceData)`**:
  * Recibe un objeto con los datos del servicio a crear[cite: 2].
  * Valida que las propiedades `name`, `description`, `duration`, `price`, `category` y `available` no sean nulas o indefinidas[cite: 2].
  * Si detecta datos faltantes, arroja automáticamente un error indicando "Campos incompletos"[cite: 2].
  * Genera el ID único de forma automática y guarda el nuevo servicio[cite: 2].

* **`updateService(id, data)`**:
  * Recibe el `id` del servicio a modificar y un objeto `data` con la nueva información[cite: 2].
  * Valida si el servicio existe previamente[cite: 2].
  * Utiliza el operador `??` para modificar los campos (`name`, `description`, `price`, `availtable`), conservando el valor que el servicio ya tenía en caso de que en `data` vengan valores nulos o indefinidos[cite: 2].

* **`deleteService(name)`**:
  * Recibe el nombre del servicio a eliminar[cite: 2].
  * Utiliza el método `findIndex` para ubicarlo y `splice` para retirarlo de manera definitiva del arreglo[cite: 2].
  * Retorna el objeto eliminado en caso de éxito, o `null` si no lo encuentra[cite: 2].

```