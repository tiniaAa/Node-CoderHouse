import servicesRepository from "../repositories/services.repository.js";

class ServicesService {
    constructor(repository = servicesRepository) {
        this.repository = repository;
    }

    async getServices(filters = {}) {
        return await this.repository.getAll(filters);
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
        const updatePayload = { ...data };
        delete updatePayload.id;
        delete updatePayload._id;

        return await this.repository.update(id, updatePayload);
    }

    async deleteService(id) {
        return await this.repository.delete(id);
    }
}

export default new ServicesService();
