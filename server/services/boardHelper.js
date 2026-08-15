import { getBoardByIdModel } from "../models/boardModel.js";
import { createError } from "../utils/createError.js";

export const checkIfBoardExist = async (boardId, ownerId = null) => {
  const checkBoard = await getBoardByIdModel(boardId, ownerId);

  if (!checkBoard) {
    throw createError("Board not found", 400);
  }
  return checkBoard;
};