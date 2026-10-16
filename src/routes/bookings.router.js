import { Router } from "express";
import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const bookingsRouter = Router();
const serviceManager = new ServiceManager("./src/data/services.json");
const bookingManager = new BookingManager("./src/data/bookings.json", serviceManager);

// GET /api/bookings — devuelve todas las reservas
bookingsRouter.get("/", async (req, res) => {
    try {
        const bookings = await bookingManager.getBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/bookings/:bid — devuelve una reserva por id
bookingsRouter.get("/:bid", async (req, res) => {
    try {
        const { bid } = req.params;
        const booking = await bookingManager.getBookingById(bid);

        if (!booking) {
            return res.status(404).json({ error: `Reserva con id ${bid} no encontrada` });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/bookings — crea una reserva (puede iniciarse con services vacío)
bookingsRouter.post("/", async (req, res) => {
    try {
        const bookingCreated = await bookingManager.createBooking(req.body);
        res.status(201).json({ message: "Reserva creada exitosamente", booking: bookingCreated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST /api/bookings/:bid/services/:sid — agrega un servicio a una reserva existente, validando que ambos existan
bookingsRouter.post("/:bid/services/:sid", async (req, res) => {
    try {
        const { bid, sid } = req.params;
        const updatedBooking = await bookingManager.addServiceToBooking(bid, sid);
        res.status(200).json({ message: "Servicio agregado a la reserva exitosamente", booking: updatedBooking });
    } catch (error) {
        const statusCode = error.statusCode || 400;
        res.status(statusCode).json({ error: error.message });
    }
});

export default bookingsRouter;
