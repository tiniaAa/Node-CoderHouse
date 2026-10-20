import mongoose from "mongoose";
import { serviceModel } from "../models/service.model.js";

class ServicesDao {
    async getAll(filters = {}) {
        const query = {};

        if (filters.category) {
            query.category = { $regex: new RegExp(`^${filters.category.trim()}$`, "i") };
        }

        if (filters.available !== undefined) {
            query.available = filters.available === "true" || filters.available === true;
        }

        const services = await serviceModel.find(query).lean();
        return services.map(s => ({ ...s, id: s._id.toString() }));
    }

    async getById(id) {
        if (!mongoose.isValidObjectId(id)) return null;
        const service = await serviceModel.findById(id).lean();
        if (!service) return null;
        return { ...service, id: service._id.toString() };
    }

    async create(serviceData) {
        const created = await serviceModel.create(serviceData);
        const obj = created.toObject();
        return { ...obj, id: obj._id.toString() };
    }

    async update(id, updateData) {
        if (!mongoose.isValidObjectId(id)) return null;
        const updated = await serviceModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (!updated) return null;
        return { ...updated, id: updated._id.toString() };
    }

    async delete(id) {
        if (!mongoose.isValidObjectId(id)) return null;
        const deleted = await serviceModel.findByIdAndDelete(id).lean();
        if (!deleted) return null;
        return { ...deleted, id: deleted._id.toString() };
    }
}

export default new ServicesDao();
