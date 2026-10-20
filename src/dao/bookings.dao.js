import fs from "fs/promises";

class BookingsDao {
    constructor(path = "./src/data/bookings.json") {
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
        const bookings = await this.#readFile();
        return bookings.find(booking => booking.id === id) || null;
    }

    async create(booking) {
        const bookings = await this.#readFile();
        bookings.push(booking);
        await this.#writeFile(bookings);
        return booking;
    }

    async update(id, updateData) {
        const bookings = await this.#readFile();
        const index = bookings.findIndex(booking => booking.id === id);
        if (index === -1) return null;

        bookings[index] = {
            ...bookings[index],
            ...updateData
        };

        await this.#writeFile(bookings);
        return bookings[index];
    }
}

export default new BookingsDao();
