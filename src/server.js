import http from "http";
import { Server } from "socket.io";
import { app } from "./app.js";
import env from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";
import servicesService from "./services/services.service.js";

const PORT = env.PORT || 8080;

// Crear servidor HTTP que envuelve Express
const server = http.createServer(app);

// Inicializar Socket.io sobre el servidor HTTP
export const io = new Server(server);

// Configuración de eventos de Socket.io en tiempo real
io.on("connection", (socket) => {
    console.log(`📡 Cliente conectado vía WebSocket: ${socket.id}`);

    // Acción en tiempo real: creación de servicio desde el navegador
    socket.on("new-service", async (serviceData) => {
        try {
            await servicesService.createService(serviceData);
            // Obtener lista actualizada desde MongoDB
            const updatedServices = await servicesService.getServices();
            // Emitir evento a TODOS los clientes conectados para actualizar la vista sin recargar
            io.emit("services-updated", updatedServices);
        } catch (error) {
            socket.emit("service-error", error.message);
        }
    });

    socket.on("disconnect", () => {
        console.log(`🔌 Cliente desconectado: ${socket.id}`);
    });
});

// Conectar a MongoDB Atlas e iniciar el servidor
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
});
