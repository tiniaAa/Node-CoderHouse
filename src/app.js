import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js";
import viewsRouter from "./routes/views.router.js";
import { rotingDetector } from "./middleware/rotingDetector.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Configuración del motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middlewares para procesar body y logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rotingDetector);

// Archivos estáticos (CSS y JS cliente)
app.use(express.static(path.join(__dirname, "public")));

// Vinculación de routers de API REST y Vistas
app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/views", viewsRouter);

// Ruta raíz
app.get("/", (req, res) => {
    res.redirect("/views/services");
});
