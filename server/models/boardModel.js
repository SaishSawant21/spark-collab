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

export const fetchBoardsModel = async(ownerId) => {
    try {
        const fetchBoards = await db.query(`SELECT * FROM boards
            WHERE owner_id=$1 ORDER BY created_at DESC;
            `,[ownerId]);
        return fetchBoards.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }   
}

export const getBoardByIdModel = async (ownerId,boardId) =>{

        const boardData = await db.query(`SELECT * FROM boards
            WHERE owner_id = $1 AND id = $2`,[ownerId,boardId]);
            return boardData.rows[0];
}