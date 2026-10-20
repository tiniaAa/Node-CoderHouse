import servicesDao from "../dao/services.dao.js";

class ServicesRepository {
    constructor(dao = servicesDao) {
        this.dao = dao;
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async create(service) {
        return await this.dao.create(service);
    }

    async update(id, updateData) {
        return await this.dao.update(id, updateData);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }
}

export default new ServicesRepository();
