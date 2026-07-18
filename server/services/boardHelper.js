export const checkIfBoardExist = async (boardId, ownerId = null) => {
  const checkBoard = await getBoardByIdModel(boardId, ownerId);

  if (!checkBoard) {
    throw createError("Board not found", 404);
  }
  return checkBoard;
};