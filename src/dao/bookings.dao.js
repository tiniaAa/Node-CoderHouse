import mongoose from "mongoose";
import { bookingModel } from "../models/booking.model.js";

class BookingsDao {
    async getAll() {
        const bookings = await bookingModel.find().populate("services.service").lean();
        return bookings.map(b => ({ ...b, id: b._id.toString() }));
    }

    async getById(id) {
        if (!mongoose.isValidObjectId(id)) return null;
        const booking = await bookingModel.findById(id).populate("services.service").lean();
        if (!booking) return null;
        return { ...booking, id: booking._id.toString() };
    }

    async create(bookingData) {
        const created = await bookingModel.create(bookingData);
        const obj = created.toObject();
        return { ...obj, id: obj._id.toString() };
    }

    async update(id, updateData) {
        if (!mongoose.isValidObjectId(id)) return null;
        const updated = await bookingModel.findByIdAndUpdate(id, updateData, { new: true })
            .populate("services.service")
            .lean();
        if (!updated) return null;
        return { ...updated, id: updated._id.toString() };
    }
}

export default new BookingsDao();
