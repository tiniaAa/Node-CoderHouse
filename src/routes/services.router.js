import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";

const servicesRouter = Router();
const serviceManager = new ServiceManager("./src/data/services.json");

// GET /api/services — devuelve todos los servicios (acepta query params: ?category=... & ?available=...)
servicesRouter.get("/", async (req, res) => {
    try {
        const { category, available } = req.query;
        const services = await serviceManager.getServices({ category, available });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/services/:sid — devuelve un servicio por id
servicesRouter.get("/:sid", async (req, res) => {
    try {
        const { sid } = req.params;
        const service = await serviceManager.getServiceById(sid);

        if (!service) {
            return res.status(404).json({ error: `Servicio con id ${sid} no encontrado` });
        }

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/services — crea un servicio (todos los campos deben validarse; el id no se envía desde el body)
servicesRouter.post("/", async (req, res) => {
    try {
        const serviceAdded = await serviceManager.addService(req.body);
        res.status(201).json({ message: "Servicio creado exitosamente", service: serviceAdded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/services/:sid — actualiza un servicio (no se puede modificar el id)
servicesRouter.put("/:sid", async (req, res) => {
    try {
        const { sid } = req.params;
        const updatedService = await serviceManager.updateService(sid, req.body);

        if (!updatedService) {
            return res.status(404).json({ error: `Servicio con id ${sid} no encontrado para actualizar` });
        }

        res.status(200).json({ message: "Servicio actualizado exitosamente", service: updatedService });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/services/:sid — elimina un servicio
servicesRouter.delete("/:sid", async (req, res) => {
    try {
        const { sid } = req.params;
        const deletedService = await serviceManager.deleteService(sid);

        if (!deletedService) {
            return res.status(404).json({ error: `Servicio con id ${sid} no encontrado para eliminar` });
        }

        res.status(200).json({ message: "Servicio eliminado exitosamente", service: deletedService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default servicesRouter;
