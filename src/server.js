import { app } from "./app.js";
import env from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";

const PORT = env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`servidor escuchando en http://localhost:${PORT}`);
    });
});
