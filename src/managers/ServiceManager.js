import crypto from "crypto";

class ServiceManager {
    constructor() {
        this.services = [];
    }

    getServices(filters = {}) {
        let result = this.services;

        if (filters.category) {
            result = result.filter(service =>
                service.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

        if (filters.available !== undefined) {
            const isAvailable = filters.available === "true" || filters.available === true;
            result = result.filter(service => service.available === isAvailable);
        }

        return result;
    }

    getServicesById(id) {
        return this.services.find(service => service.id === id);
    }

    addService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData;

        if (!name || !description || !duration || price === undefined || !category || available === undefined) {
            throw new Error("Campos incompletos obligatorios");
        }

        const newService = {
            id: crypto.randomUUID(),
            name,
            description,
            duration,
            price: Number(price),
            category,
            available: Boolean(available)
        };

        this.services.push(newService);
        return newService;
    }

    updateService(id, data) {
        const service = this.getServicesById(id);
        if (!service) return null;

        // Se ignora deliberadamente cualquier intento de sobreescribir el id
        service.name = data.name ?? service.name;
        service.description = data.description ?? service.description;
        service.duration = data.duration ?? service.duration;
        service.price = data.price !== undefined ? Number(data.price) : service.price;
        service.category = data.category ?? service.category;
        service.available = data.available !== undefined ? Boolean(data.available) : service.available;

        return service;
    }

    deleteService(id) {
        const index = this.services.findIndex(service => service.id === id);
        if (index !== -1) {
            return this.services.splice(index, 1)[0];
        }
        return null;
    }
}

export default ServiceManager;
