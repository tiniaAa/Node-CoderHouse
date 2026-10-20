import mongoose from "mongoose";
import env from "./env.config.js";

export const connectDB = async () => {
    try {
        if (!env.MONGO_URI) {
            console.warn("⚠️ MONGO_URI no está definido en las variables de entorno.");
            return;
        }
        await mongoose.connect(env.MONGO_URI);
        console.log("✅ Conectado exitosamente a MongoDB Atlas");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error.message);
    }
};
