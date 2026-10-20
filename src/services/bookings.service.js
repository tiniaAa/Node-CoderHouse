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
        // 1. Validar que el servicio exista en MongoDB
        const service = await this.serviceRepo.getById(sid);
        if (!service) {
            const error = new Error(`Servicio con id ${sid} no encontrado`);
            error.statusCode = 404;
            throw error;
        }

        // 2. Validar que la reserva exista en MongoDB
        const booking = await this.repository.getById(bid);
        if (!booking) {
            const error = new Error(`Reserva con id ${bid} no encontrada`);
            error.statusCode = 404;
            throw error;
        }

        // 3. Regla de negocio: Si el servicio ya está en la reserva se incrementa quantity, sino se agrega con quantity: 1
        const servicesList = Array.isArray(booking.services) ? [...booking.services] : [];
        const sidStr = sid.toString();

        const serviceIndex = servicesList.findIndex(s => {
            const currentId = s.service?._id ? s.service._id.toString() : s.service?.toString();
            return currentId === sidStr;
        });

        if (serviceIndex !== -1) {
            servicesList[serviceIndex] = {
                service: sid,
                quantity: servicesList[serviceIndex].quantity + 1
            };
        } else {
            servicesList.push({
                service: sid,
                quantity: 1
            });
        }

        const formattedServices = servicesList.map(s => ({
            service: s.service?._id || s.service,
            quantity: s.quantity
        }));

        return await this.repository.update(bid, { services: formattedServices });
    }
}

export default new BookingsService();
