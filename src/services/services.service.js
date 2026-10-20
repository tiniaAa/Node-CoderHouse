import crypto from "crypto";
import servicesRepository from "../repositories/services.repository.js";

class ServicesService {
    constructor(repository = servicesRepository) {
        this.repository = repository;
    }

    async getServices(filters = {}) {
        let services = await this.repository.getAll();

        if (filters.category) {
            services = services.filter(service =>
                service.category && service.category.toLowerCase().trim() === filters.category.toLowerCase().trim()
            );
        }

        if (filters.available !== undefined) {
            const isAvailable = filters.available === "true" || filters.available === true;
            services = services.filter(service => service.available === isAvailable);
        }

        return services;
    }

    async getServiceById(id) {
        return await this.repository.getById(id);
    }

    async createService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData;

        if (!name || !description || !duration || price === undefined || !category || available === undefined) {
            const error = new Error("Campos incompletos obligatorios: name, description, duration, price, category, available");
            error.statusCode = 400;
            throw error;
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

        return await this.repository.create(newService);
    }

    async updateService(id, data) {
        const existing = await this.repository.getById(id);
        if (!existing) return null;

        // Regla de negocio: No se puede modificar el id
        const updatePayload = {
            ...data,
            id: existing.id
        };

        return await this.repository.update(id, updatePayload);
    }

    async deleteService(id) {
        return await this.repository.delete(id);
    }
}

export default new ServicesService();
