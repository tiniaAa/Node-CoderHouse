import mongoose from "mongoose";
import { serviceModel } from "../models/service.model.js";

class ServicesDao {
    async getAll(filters = {}) {
        const {
            category,
            available,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            order = "desc"
        } = filters;

        const query = {};

        if (category) {
            query.category = { $regex: new RegExp(`^${category.trim()}$`, "i") };
        }

        if (available !== undefined && available !== "") {
            query.available = available === "true" || available === true;
        }

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.max(1, parseInt(limit, 10) || 10);
        const skip = (pageNum - 1) * limitNum;

        const sortOptions = {};
        const sortOrder = (order === "asc" || order === "1") ? 1 : -1;
        sortOptions[sortBy] = sortOrder;

        const [services, totalResults] = await Promise.all([
            serviceModel.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(limitNum)
                .lean(),
            serviceModel.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalResults / limitNum) || 1;

        return {
            status: "success",
            totalResults,
            page: pageNum,
            limit: limitNum,
            totalPages,
            hasPrevPage: pageNum > 1,
            hasNextPage: pageNum < totalPages,
            prevPage: pageNum > 1 ? pageNum - 1 : null,
            nextPage: pageNum < totalPages ? pageNum + 1 : null,
            results: services.map(s => ({ ...s, id: s._id.toString() }))
        };
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
