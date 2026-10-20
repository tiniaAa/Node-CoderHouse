import crypto from "crypto";
import bookingsRepository from "../repositories/bookings.repository.js";
import servicesRepository from "../repositories/services.repository.js";

class BookingsService {
    constructor(repository = bookingsRepository, serviceRepo = servicesRepository) {
        this.repository = repository;
        this.serviceRepo = serviceRepo;
    }

    async getBookings() {
        return await this.repository.getAll();
    }

    async getBookingById(id) {
        return await this.repository.getById(id);
    }

    async createBooking(bookingData) {
        const { clientName, clientEmail, date, time, status = "pending", services = [] } = bookingData;

        if (!clientName || !clientEmail || !date || !time) {
            const error = new Error("Campos obligatorios incompletos: clientName, clientEmail, date, time");
            error.statusCode = 400;
            throw error;
        }

        const newBooking = {
            id: crypto.randomUUID(),
            clientName,
            clientEmail,
            date,
            time,
            status,
            services: Array.isArray(services) ? services : []
        };

        return await this.repository.create(newBooking);
    }

    async addServiceToBooking(bid, sid) {
        // 1. Validar que el servicio exista en persistencia
        const service = await this.serviceRepo.getById(sid);
        if (!service) {
            const error = new Error(`Servicio con id ${sid} no encontrado`);
            error.statusCode = 404;
            throw error;
        }

        // 2. Validar que la reserva exista en persistencia
        const booking = await this.repository.getById(bid);
        if (!booking) {
            const error = new Error(`Reserva con id ${bid} no encontrada`);
            error.statusCode = 404;
            throw error;
        }

        // 3. Regla de negocio: Si el servicio ya está en la reserva se incrementa quantity, sino se agrega con quantity: 1
        const servicesList = Array.isArray(booking.services) ? [...booking.services] : [];
        const serviceIndex = servicesList.findIndex(s => s.service === sid);

        if (serviceIndex !== -1) {
            servicesList[serviceIndex] = {
                ...servicesList[serviceIndex],
                quantity: servicesList[serviceIndex].quantity + 1
            };
        } else {
            servicesList.push({
                service: sid,
                quantity: 1
            });
        }

        return await this.repository.update(bid, { services: servicesList });
    }
}

export default new BookingsService();
