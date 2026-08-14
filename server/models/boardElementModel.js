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

export const replaceBoardElementsModel = async (boardId, elements) => {
  try {
    await db.query("BEGIN");

    const incomingIds = elements
      .filter((element) => element.id)
      .map((element) => element.id);

    if (incomingIds.length > 0) {
      await db.query(
        `DELETE FROM board_elements
         WHERE board_id = $1
         AND id NOT IN (${incomingIds.map((_, i) => `$${i + 2}`).join(", ")})`,
        [boardId, ...incomingIds]
      );
    } else {
      await db.query(
        `DELETE FROM board_elements
         WHERE board_id = $1`,
        [boardId]
      );
    }

    for (const element of elements) {
      if (element.id) {
        const result = await db.query(
          `UPDATE board_elements
     SET
       element_type = $1,
       element_data = $2,
       updated_at = NOW()
     WHERE id = $3
     AND board_id = $4`,
          [
            element.element_type,
            element.element_data,
            element.id,
            boardId,
          ]
        );

        if (result.rowCount === 0) {
          await db.query(
            `INSERT INTO board_elements
       (id, board_id, created_by, element_type, element_data)
       VALUES ($1, $2, $3, $4, $5)`,
            [
              element.id,
              boardId,
              element.created_by,
              element.element_type,
              element.element_data,
            ]
          );
        }
      } else {
        await db.query(
          `INSERT INTO board_elements
           (board_id, created_by, element_type, element_data)
           VALUES ($1, $2, $3, $4)`,
          [
            boardId,
            element.created_by,
            element.element_type,
            element.element_data,
          ]
        );
      }
    }

    await db.query("COMMIT");

    const result = await db.query(
      `SELECT *
       FROM board_elements
       WHERE board_id = $1
       ORDER BY (element_data->>'zIndex')::integer ASC, id ASC`,
      [boardId]
    );

    return result.rows;
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
};