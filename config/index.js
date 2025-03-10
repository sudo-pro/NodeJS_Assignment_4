import dotenv from "dotenv";

import sequelize from "./db.js";

(async () => {
    dotenv.config();
    try {
        await sequelize.sync({ force: true });
        console.log("Database connection established successfully.");
        return true;
    } catch (error) {
        console.error("Failed to establish database connection:", error);
        return false;
    }
})();
