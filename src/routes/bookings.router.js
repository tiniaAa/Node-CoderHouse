import { Router } from "express";
import {
    createBooking,
    getBookingById,
    addServiceToBooking,
    getBookings
} from "../controllers/bookings.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createBookingSchema, addServiceToBookingParamsSchema } from "../validators/booking.validator.js";

const bookingsRouter = Router();

// GET /api/bookings — devuelve todas las reservas
bookingsRouter.get("/", getBookings);

// GET /api/bookings/:bid — devuelve reserva por id con servicios poblados (populate)
bookingsRouter.get("/:bid", getBookingById);

// POST /api/bookings — validado con Zod antes de persistir
bookingsRouter.post("/", validate(createBookingSchema), createBooking);

// POST /api/bookings/:bid/services/:sid — valida parámetros ObjectId con Zod y existencia cruzada
bookingsRouter.post("/:bid/services/:sid", validate(addServiceToBookingParamsSchema, "params"), addServiceToBooking);

export default bookingsRouter;
