import fs from "fs/promises";

class ServicesDao {
    constructor(path = "./src/data/services.json") {
        this.path = path;
    }

    async #readFile() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async #writeFile(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    }

    async getAll() {
        return await this.#readFile();
    }

    async getById(id) {
        const services = await this.#readFile();
        return services.find(service => service.id === id) || null;
    }

    async create(service) {
        const services = await this.#readFile();
        services.push(service);
        await this.#writeFile(services);
        return service;
    }

    async update(id, updateData) {
        const services = await this.#readFile();
        const index = services.findIndex(service => service.id === id);
        if (index === -1) return null;

        services[index] = {
            ...services[index],
            ...updateData
        };

        await this.#writeFile(services);
        return services[index];
    }

    async delete(id) {
        const services = await this.#readFile();
        const index = services.findIndex(service => service.id === id);
        if (index === -1) return null;

        const [deleted] = services.splice(index, 1);
        await this.#writeFile(services);
        return deleted;
    }
}

export default new ServicesDao();
