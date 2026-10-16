import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const serviceManager = new ServiceManager("./src/data/services.json");
const bookingManager = new BookingManager("./src/data/bookings.json", serviceManager);

export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingManager.getBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBookingById = async (req, res) => {
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
};

export const createBooking = async (req, res) => {
    try {
        const bookingCreated = await bookingManager.createBooking(req.body);
        res.status(201).json({ message: "Reserva creada exitosamente", booking: bookingCreated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addServiceToBooking = async (req, res) => {
    try {
        const { bid, sid } = req.params;

        // Validar la existencia del servicio via ServiceManager
        const service = await serviceManager.getServiceById(sid);
        if (!service) {
            return res.status(404).json({ error: `Servicio con id ${sid} no encontrado` });
        }

        // Validar la existencia de la reserva via BookingManager
        const booking = await bookingManager.getBookingById(bid);
        if (!booking) {
            return res.status(404).json({ error: `Reserva con id ${bid} no encontrada` });
        }

        const updatedBooking = await bookingManager.addServiceToBooking(bid, sid);
        res.status(200).json({ message: "Servicio agregado a la reserva exitosamente", booking: updatedBooking });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }
};
