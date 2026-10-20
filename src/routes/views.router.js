import { Router } from "express";
import { renderServices, renderAvailability } from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get("/services", renderServices);
viewsRouter.get("/availability", renderAvailability);
viewsRouter.get("/bookings", renderAvailability); // Alias complementario

export default viewsRouter;
