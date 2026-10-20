import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        clientName: { type: String, required: true },
        clientEmail: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        status: { type: String, default: "pending" },
        services: [
            {
                _id: false,
                service: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "services",
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const bookingModel = mongoose.model("bookings", bookingSchema);
