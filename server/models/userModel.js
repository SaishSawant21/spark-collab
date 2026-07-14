import db from './../config/db.js';

export const createUser = async (username, email, password, avatar)=>{
    try {
        const executeQuery = await db.query(`INSERT into users 
            (username, email, password, avatar)
            VALUES($1,$2,$3,$4) RETURNING *`,
            [username, email, password, avatar]
        );
        return executeQuery.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const checkEmail = async (email)=>{
    try {
        const result = await db.query(`SELECT * FROM users where email=$1`,
            [email]
        ); 
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export const checkUsername = async (username)=>{
    try {
        const result = await db.query(`SELECT * FROM users where username=$1`,
            [username]
        ); 
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}