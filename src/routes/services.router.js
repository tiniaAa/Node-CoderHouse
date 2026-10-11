import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";

const servicesRouter = Router();
const serviceManager = new ServiceManager();

// GET /api/services - acepta query params ?category=... y ?available=...
servicesRouter.get("/", (req, res) => {
    try {
        const { category, available } = req.query;
        const services = serviceManager.getServices({ category, available });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/services/:sid - busca por sid (200 si existe, 404 si no)
servicesRouter.get("/:sid", (req, res) => {
    try {
        const { sid } = req.params;
        const service = serviceManager.getServicesById(sid);

        if (!service) {
            return res.status(404).json({ error: `Servicio con id ${sid} no encontrado` });
        }

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/services - crea servicio (201 si se crea, 400 si faltan campos)
servicesRouter.post("/", (req, res) => {
    try {
        const serviceAdded = serviceManager.addService(req.body);
        res.status(201).json({ message: "Servicio creado exitosamente", service: serviceAdded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/services/:sid - actualiza servicio (200 si existe, 404 si no)
servicesRouter.put("/:sid", (req, res) => {
    try {
        const { sid } = req.params;
        const updatedService = serviceManager.updateService(sid, req.body);

        if (!updatedService) {
            return res.status(404).json({ error: `Servicio con id ${sid} no encontrado para actualizar` });
        }

        res.status(200).json({ message: "Servicio actualizado exitosamente", service: updatedService });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/services/:sid - elimina servicio (200 si existe, 404 si no)
servicesRouter.delete("/:sid", (req, res) => {
    try {
        const { sid } = req.params;
        const deletedService = serviceManager.deleteService(sid);

        if (!deletedService) {
            return res.status(404).json({ error: `Servicio con id ${sid} no encontrado para eliminar` });
        }

        res.status(200).json({ message: "Servicio eliminado exitosamente", service: deletedService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default servicesRouter;
