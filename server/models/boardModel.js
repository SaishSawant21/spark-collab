import db from "../config/db.js"
export const createBoardModel = async (title, description, is_public, ownerId) => {
    try {
        const insertBoard = await db.query(`
            INSERT INTO boards 
            (title,description,is_public,owner_id)
             VALUES($1,$2,$3,$4) 
             RETURNING *`, 
             [title, description, is_public, ownerId]);
        return insertBoard.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}