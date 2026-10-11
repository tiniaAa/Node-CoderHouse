import dotenv from "dotenv";

dotenv.config();

const config ={
    PORT: process.env.PORT
}
for (const key in config) {
    if (!config[key]) {
        throw new Error(`🚨 ERROR FATAL: Falta la variable de entorno '${key}'. Revisá tu archivo .ev`);
    }
}
export default config;