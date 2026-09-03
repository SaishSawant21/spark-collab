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
	const fetchBoards = await db.query(`SELECT DISTINCT b.*,
    CASE
        WHEN b.owner_id = $1 THEN 'owner'
        ELSE bm.role
				END AS role
		FROM boards b
		LEFT JOIN board_members bm
				ON bm.board_id = b.id
				AND bm.user_id = $1
		WHERE b.owner_id = $1
			OR bm.user_id = $1
		ORDER BY b.created_at DESC;`, [ownerId]);
	return fetchBoards.rows;
}

export const getBoardByIdModel = async (boardId, ownerId = null) => {
	let query = `SELECT * FROM boards WHERE id = $1`;
	let values = [boardId];

	if (ownerId !== null) {
		query += ` AND owner_id = $2`;
		values.push(ownerId);
	}

	const result = await db.query(query, values);
	return result.rows[0];
};

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
export const getBoardMemberModel = async (boardId, userId) => {
	const result = await db.query(`SELECT * FROM board_members 
		WHERE board_id=$1 AND user_id=$2 `, [boardId, userId]);
	return result.rows[0];
}

export const addBoardMemberModel = async (boardId, userId, role) => {
	const result = await db.query(`INSERT INTO board_members 
	(board_id,user_id,role) VALUES($1,$2,$3)`, [boardId, userId, role]);
	return result.rows[0];
}

export const getBoardMembersModel = async (boardId) => {
	const boardMembers = await db.query(`
		SELECT u.id as user_id, u.username, bm.role, u.email from board_members bm
		INNER JOIN users u on u.id = bm.user_id
		WHERE bm.board_id = $1 
		`, [boardId]);
	return boardMembers.rows;
};

export const removeBoardMemberModel = async (boardId, userId) => {
	const result = await db.query(`DELETE FROM board_members
		WHERE board_id=$1 AND user_id=$2 RETURNING *`, [boardId, userId]);
	return result.rows[0];
}
