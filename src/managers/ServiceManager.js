import crypto from "crypto";
import fs from "fs/promises";

class ServiceManager {
    constructor(path = "./src/data/services.json") {
        this.path = path;
    }

    async #readServices() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async #writeServices(services) {
        await fs.writeFile(this.path, JSON.stringify(services, null, 2));
    }

    async getServices(filters = {}) {
        let result = await this.#readServices();

        if (filters.category) {
            result = result.filter(service =>
                service.category && service.category.toLowerCase().trim() === filters.category.toLowerCase().trim()
            );
        }

        if (filters.available !== undefined) {
            const isAvailable = filters.available === "true" || filters.available === true;
            result = result.filter(service => service.available === isAvailable);
        }

        return result;
    }

    async getServiceById(id) {
        const services = await this.#readServices();
        return services.find(service => service.id === id);
    }

    // Alias para compatibilidad
    async getServicesById(id) {
        return this.getServiceById(id);
    }

    async addService(serviceData) {
        const services = await this.#readServices();
        const { name, description, duration, price, category, available } = serviceData;

        if (!name || !description || !duration || price === undefined || !category || available === undefined) {
            throw new Error("Campos incompletos obligatorios: name, description, duration, price, category, available");
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

        services.push(newService);
        await this.#writeServices(services);
        return newService;
    }

    async updateService(id, data) {
        const services = await this.#readServices();
        const index = services.findIndex(service => service.id === id);

        if (index === -1) {
            return null;
        }

        // Se actualiza el servicio protegiendo el ID original
        services[index] = {
            ...services[index],
            ...data,
            id: services[index].id
        };

        await this.#writeServices(services);
        return services[index];
    }

    async deleteService(id) {
        const services = await this.#readServices();
        const index = services.findIndex(service => service.id === id);

        if (index !== -1) {
            const [deleted] = services.splice(index, 1);
            await this.#writeServices(services);
            return deleted;
        }

        return null;
    }
}

export default ServiceManager;
