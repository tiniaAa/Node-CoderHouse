import { Router } from "express";
import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from "../controllers/services.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createServiceSchema, updateServiceSchema } from "../validators/service.validator.js";

const servicesRouter = Router();

// GET /api/services — acepta query params: category, available, page, limit, sortBy, order
servicesRouter.get("/", getServices);

// GET /api/services/:sid — devuelve servicio por id
servicesRouter.get("/:sid", getServiceById);

// POST /api/services — validado con Zod antes de persistir
servicesRouter.post("/", validate(createServiceSchema), createService);

// PUT /api/services/:sid — validado con Zod antes de actualizar
servicesRouter.put("/:sid", validate(updateServiceSchema), updateService);

// DELETE /api/services/:sid — elimina servicio por id
servicesRouter.delete("/:sid", deleteService);

export default servicesRouter;
