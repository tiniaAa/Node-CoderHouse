import bookingsService from "../services/bookings.service.js";

export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingsService.getBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const { bid } = req.params;
        const booking = await bookingsService.getBookingById(bid);

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
        const bookingCreated = await bookingsService.createBooking(req.body);
        res.status(201).json({ message: "Reserva creada exitosamente", booking: bookingCreated });
    } catch (error) {
        const statusCode = error.statusCode || 400;
        res.status(statusCode).json({ error: error.message });
    }
};

export const addServiceToBooking = async (req, res) => {
    try {
        const { bid, sid } = req.params;
        const updatedBooking = await bookingsService.addServiceToBooking(bid, sid);
        res.status(200).json({ message: "Servicio agregado a la reserva exitosamente", booking: updatedBooking });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }
};
