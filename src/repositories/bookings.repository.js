import bookingsDao from "../dao/bookings.dao.js";

class BookingsRepository {
    constructor(dao = bookingsDao) {
        this.dao = dao;
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async create(booking) {
        return await this.dao.create(booking);
    }

    async update(id, updateData) {
        return await this.dao.update(id, updateData);
    }
}

export default new BookingsRepository();
