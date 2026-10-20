import servicesService from "../services/services.service.js";
import bookingsService from "../services/bookings.service.js";

export const renderServices = async (req, res) => {
    try {
        const services = await servicesService.getServices();
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
        const [availableServices, bookings] = await Promise.all([
            servicesService.getServices({ available: true }),
            bookingsService.getBookings()
        ]);

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
