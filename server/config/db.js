import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.local" });
const processENV = process.env;
const db = new pg.Client({
    user: processENV.DB_USER,
    host: processENV.DB_HOST,
    password: processENV.DB_PASS,
    port: processENV.DB_PORT,
    database: processENV.DB_NAME
})
export default db;
