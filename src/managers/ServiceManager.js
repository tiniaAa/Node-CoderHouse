import crypto from "crypto";
import fs from "fs/promises";

class ServiceManager {
    constructor(path) {
        this.path= path;
    }

    async #readServices(){
        const data = await fs.readFile(this.path,"utf-8");
        return JSON.parse(data);
    }

    async #writeServices(service){
        await fs.writeFile(this.path,JSON.stringify(service,null,2));
    }

    async getServices(filters = {}) {
        let result = await this.#readServices();

        if (filters.category) {
            result = result.filter(service =>
                service.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

        if (filters.available !== undefined) {
            const isAvailable = filters.available === "true" || filters.available === true;
            result = result.filter(service => service.available === isAvailable);
        }

        return await result;
    }

    async getServicesById(id) {
        const services = await this.#readServices();
        return services.find(service => service.id === id);
    }

    async addService(serviceData) {
        const services = await this.#readServices();
        const { name, description, duration, price, category, available } = serviceData;
        if (!name || !description || !duration || price === undefined || !category || available === undefined) {
            throw new Error("Campos incompletos obligatorios");
        }
        const newService={
            id:crypto.randomUUID(),
            name:name,
            description:description,
            duration:duration,
            price:price,
            category:category,
            available:available

        };

        services.push(newService);
        await this.#writeServices(services);
        return newService;

    }

    async updateService(id, data) {
        const services = await this.#readServices();
        const index = services.findIndex(service=> service.id === id);
        if(index === -1){return null;}
        services[index]={
            ...services[index],
            ...data,
            id: services[index].id
        }
        await this.#writeServices(services)
        return services[index]
    }

    async deleteService(id) {
        const services= await this.#readServices();
        const index = services.findIndex(service => service.id === id);
        if (index === -1) {
            return null;
        }
        const deletedService = services.splice(index,1)[0];
        await this.#writeServices(services);
        return deletedService;
    }
}

export default ServiceManager;
