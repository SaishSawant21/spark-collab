import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.local" });
const processENV = process.env;
const db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
})
export default db;
