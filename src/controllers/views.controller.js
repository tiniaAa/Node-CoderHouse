import servicesService from "../services/services.service.js";
import bookingsService from "../services/bookings.service.js";

export const renderServices = async (req, res) => {
    try {
        const response = await servicesService.getServices({ limit: 50 });
        const services = Array.isArray(response) ? response : (response.results || []);

        res.render("services", {
            title: "Catálogo de Servicios",
            services
        });
    } catch (error) {
        res.status(500).render("services", {
            title: "Catálogo de Servicios",
            services: [],
            error: error.message
        });
    }
};

export const renderAvailability = async (req, res) => {
    try {
        const [servicesResponse, bookings] = await Promise.all([
            servicesService.getServices({ available: true, limit: 50 }),
            bookingsService.getBookings()
        ]);

        const availableServices = Array.isArray(servicesResponse) ? servicesResponse : (servicesResponse.results || []);

        res.render("availability", {
            title: "Disponibilidad y Reservas",
            availableServices,
            bookings
        });
    } catch (error) {
        res.status(500).render("availability", {
            title: "Disponibilidad y Reservas",
            availableServices: [],
            bookings: [],
            error: error.message
        });
    }
};
