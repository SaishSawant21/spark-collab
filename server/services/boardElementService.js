import { addBoardElementModel, deleteBoardElementModel, getBoardAllElementsModel, getBoardElementModel, replaceBoardElementsModel, updateBoardElementModel } from "../models/boardElementModel.js";
import { addBoardMemberModel, getBoardMemberModel } from "../models/boardModel.js";
import { createError } from "../utils/createError.js";
import { checkIfBoardExist } from "./boardHelper.js"

export const addBoardElementService = async (elementContent) => {
  const { boardId, createdBy, elementType, elementData } = elementContent;
  const board = await checkIfBoardExist(boardId);
  let member = null;
  if (parseInt(board.owner_id) !== createdBy) {
    member = await getBoardMemberModel(boardId, createdBy);
    if (!member) throw createError("Member not found", 404);
    if (member.role === 'viewer') throw createError("Forbidden", 403);
  }
  if (!elementType?.trim()) throw createError("Element Type is required", 400);
  if (!elementData) throw createError("Element Data is required", 400);
  return await addBoardElementModel(elementContent);
}

export const getBoardElementService = async (elementContent) => {
  const { boardId, userId } = elementContent;
  const board = await checkIfBoardExist(boardId);
  let member = null;
  if (parseInt(board.owner_id) !== userId) {
    member = await getBoardMemberModel(boardId, userId);
    if (!member) throw createError("Forbidden", 403);
  }
  return await getBoardAllElementsModel(boardId);
}

export const updateBoardElementService = async (elementContent) => {
  let { elementId, elementData, elementType, createdBy } = elementContent;
  const element = await getBoardElementModel(elementId);
  if (!element) throw createError("Element not found", 404);
  const board = await checkIfBoardExist(element.board_id);

  let member = null;
  if (parseInt(board.owner_id) !== createdBy) {
    member = await getBoardMemberModel(element?.board_id, createdBy);
    if (!member) throw createError("Forbidden", 403);
    if (member.role === 'viewer') throw createError("Forbidden", 403);
  }
  elementType = elementType?.trim() || element.element_type;

  elementData = {
    ...element.element_data,
    ...elementData
  };
  if (typeof elementData === "string") {
    elementData = JSON.parse(elementData);
  }

  return updateBoardElementModel(elementId, elementType, elementData);
}

export const deleteBoardElementService = async (boardId, elementId, userId) => {
  if (!elementId) throw createError("Element ID is required", 400);
  const element = await getBoardElementModel(elementId);
  if (!element) throw createError("Element not found", 404);
  if (element.board_id !== boardId) throw createError("Element does not belong to this board", 400);
  const board = await checkIfBoardExist(element.board_id);
  let member = null;
  if (parseInt(board.owner_id) !== userId) {
    member = await getBoardMemberModel(element?.board_id, userId);
    if (!member) throw createError("Forbidden", 403);
    if (member.role === 'viewer') throw createError("Forbidden", 403);
  }
  return await deleteBoardElementModel(elementId);
}

export const replaceBoardElementsService = async (
  boardId,
  userId,
  elements
) => {
  const board = await checkIfBoardExist(boardId);

  if (parseInt(board.owner_id) !== userId) {
    const member = await getBoardMemberModel(boardId, userId);

    if (!member) {
      throw createError("Forbidden", 403);
    }

    if (member.role === "viewer") {
      throw createError("Forbidden", 403);
    }
  }

  if (!Array.isArray(elements)) {
    throw createError("Elements must be an array", 400);
  }

  return replaceBoardElementsModel(boardId, elements);
};