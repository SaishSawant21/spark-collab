import { createBoardModel, deleteBoardModel, fetchBoardsModel, getBoardByIdModel, updatedBoardModel } from "../models/boardModel.js";
import { createError } from "../utils/createError.js";

export const createBoardService = async (title, description, is_public, ownerId) => {
	const trimTitle = title?.trim() || '';
	if (!trimTitle) throw new Error('Title is compulsory');
	if (trimTitle.length > 100) throw createError('Title is too long', 400);
	const trimDescription = description?.trim() || '';
	const boardVisibility = is_public ?? false;
	return await createBoardModel(trimTitle, trimDescription, boardVisibility, ownerId);
}

export const getBoardsSerive = async (ownerId) => {
	return fetchBoardsModel(ownerId);
}

export const getBoardByIdService = async (ownerId, boardId) => {
	const board = await getBoardByIdModel(ownerId, boardId);
	if (!board) {
		throw new Error("Board not found");
	}
	return board;
}

export const updatedBoardService = async (boardId, ownerId, title, description, is_public) => {
	const existingBoard = await getBoardByIdModel(ownerId, boardId);

	if (!existingBoard) {
		throw createError("Board not found", 404);
	}
	const trimTitle = title?.trim() || existingBoard.title;
	if (!trimTitle) throw new Error('Title is compulsory');
	const trimDescription = description?.trim() || existingBoard.description;
	const boardVisibility = is_public ?? existingBoard.is_public;
	return await updatedBoardModel(
		boardId, ownerId, trimTitle, trimDescription, boardVisibility
	)
}

export const deleteBoardService = async (ownerId, boardId) => {
	const existingBoard = await getBoardByIdModel(ownerId, boardId);

	if (!existingBoard) {
		throw createError("Board not found", 404);
	}
	return await deleteBoardModel(ownerId, boardId);
}