import { createConnection } from "mysql2";

const db = createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "tanuj726",
    database: process.env.DB_NAME || "netflix",
});

export default db;