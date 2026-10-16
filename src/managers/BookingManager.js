import crypto from "crypto";
import fs from "fs/promises";

class BookingManager {
    constructor(path = "./src/data/bookings.json", serviceManager = null) {
        this.path = path;
        this.serviceManager = serviceManager;
    }

    async #readBookings() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async #writeBookings(bookings) {
        await fs.writeFile(this.path, JSON.stringify(bookings, null, 2));
    }

    async getBookings() {
        return await this.#readBookings();
    }

    async getBookingById(id) {
        const bookings = await this.#readBookings();
        return bookings.find(booking => booking.id === id);
    }

    async createBooking(bookingData) {
        const { clientName, clientEmail, date, time, status = "pending", services = [] } = bookingData;

        if (!clientName || !clientEmail || !date || !time) {
            throw new Error("Campos obligatorios incompletos: clientName, clientEmail, date, time");
        }

        const bookings = await this.#readBookings();

        const newBooking = {
            id: crypto.randomUUID(),
            clientName,
            clientEmail,
            date,
            time,
            status,
            services: Array.isArray(services) ? services : []
        };

        bookings.push(newBooking);
        await this.#writeBookings(bookings);
        return newBooking;
    }

    async addServiceToBooking(bid, sid) {
        // Validar existencia del servicio si se configuró el ServiceManager
        if (this.serviceManager) {
            const service = await this.serviceManager.getServiceById(sid);
            if (!service) {
                const error = new Error(`Servicio con id ${sid} no encontrado`);
                error.statusCode = 404;
                throw error;
            }
        }

        const bookings = await this.#readBookings();
        const bookingIndex = bookings.findIndex(b => b.id === bid);

        if (bookingIndex === -1) {
            const error = new Error(`Reserva con id ${bid} no encontrada`);
            error.statusCode = 404;
            throw error;
        }

        const booking = bookings[bookingIndex];
        if (!Array.isArray(booking.services)) {
            booking.services = [];
        }

        const serviceIndex = booking.services.findIndex(s => s.service === sid);

        if (serviceIndex !== -1) {
            booking.services[serviceIndex].quantity += 1;
        } else {
            booking.services.push({
                service: sid,
                quantity: 1
            });
        }

        await this.#writeBookings(bookings);
        return booking;
    }
}

export default BookingManager;
