import { Router } from "express";
import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from "../controllers/services.controller.js";

const servicesRouter = Router();

servicesRouter.get("/", getServices);
servicesRouter.get("/:sid", getServiceById);
servicesRouter.post("/", createService);
servicesRouter.put("/:sid", updateService);
servicesRouter.delete("/:sid", deleteService);

export default servicesRouter;
