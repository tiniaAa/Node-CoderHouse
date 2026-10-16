import express from "express";
import servicesRouter from "./routes/services.router.js";
import { rotingDetector } from "./middleware/rotingDetector.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rotingDetector);
// Vinculación del router en la ruta base
app.use("/api/services", servicesRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "API del sistema de Turnos y Reservas"
    });
});
