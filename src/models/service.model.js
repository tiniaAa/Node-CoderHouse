import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        available: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const serviceModel = mongoose.model("services", serviceSchema);
