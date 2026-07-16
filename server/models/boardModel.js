import db from "../config/db.js"
export const createBoardModel = async (title, description, is_public, ownerId) => {
	const insertBoard = await db.query(`
            INSERT INTO boards 
            (title,description,is_public,owner_id)
             VALUES($1,$2,$3,$4) 
             RETURNING *`,
		[title, description, is_public, ownerId]);
	return insertBoard.rows[0];
}

export const fetchBoardsModel = async (ownerId) => {
	const fetchBoards = await db.query(`SELECT * FROM boards
            WHERE owner_id=$1 ORDER BY created_at DESC;
            `, [ownerId]);
	return fetchBoards.rows;

}

export const getBoardByIdModel = async (ownerId, boardId) => {
	const boardData = await db.query(`SELECT * FROM boards
            WHERE owner_id = $1 AND id = $2`, [ownerId, boardId]);
	return boardData.rows[0];
}

export const updatedBoardModel = async (boardId, ownerId, title, description, boardVisibility) => {
	const board = await db.query(`UPDATE boards 
		SET title=$1, description=$2, is_public=$3, updated_at = NOW() 
		WHERE owner_id = $4 AND id=$5 RETURNING *
		`, [title, description, boardVisibility, ownerId, boardId]);
	return board.rows[0];
}

export const deleteBoardModel = async (ownerId, boardId) => {
	const result = await db.query(`DELETE FROM boards 
		WHERE id=$1 AND owner_id=$2 RETURNING *`, [boardId, ownerId]);
	return result.rows[0];
}