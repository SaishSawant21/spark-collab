import db from "../config/db.js";

export const addBoardElementModel = async (elementContent) => {
  const { boardId, createdBy, elementType, elementData } = elementContent;
  const result = await db.query(`INSERT INTO board_elements
     (board_id, created_by, element_type, element_data) VALUES($1,$2,$3,$4) RETURNING *`,
    [boardId, createdBy, elementType, elementData]);
  return result.rows[0];
}

export const getBoardAllElementsModel = async (boardId) => {
  const result = await db.query(`SELECT * FROM board_elements 
    WHERE board_id=$1 ORDER BY updated_at ASC`, [boardId]);
  return result.rows;
}

export const getBoardElementModel = async (elementId) => {
  const result = await db.query(`SELECT * from board_elements 
    WHERE id=$1`, [elementId]);
  return result.rows[0];
}

export const updateBoardElementModel = async (elementId, elementType, elementData) => {
  const result = await db.query(`UPDATE board_elements 
    SET element_type=$1, element_data=$2, updated_at = CURRENT_TIMESTAMP  
    WHERE id=$3 RETURNING *`,
    [elementType, elementData, elementId]);
  return result.rows[0];
}

export const deleteBoardElementModel = async (elementId) => {
  const result = await db.query(`DELETE FROM board_elements 
    WHERE id=$1 RETURNING *`, [elementId]);
  return result.rows[0];
}