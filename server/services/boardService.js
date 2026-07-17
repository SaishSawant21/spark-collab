import { addBoardMemberModel, createBoardModel, deleteBoardModel, fetchBoardsModel, getBoardByIdModel, updatedBoardModel } from "../models/boardModel.js";
import { getUserByIdModel } from "../models/userModel.js";
import { createError } from "../utils/createError.js";

export const createBoardService = async (title, description, is_public, ownerId) => {
	const trimTitle = title?.trim() || '';
	if (!trimTitle) throw createError('Title is compulsory', 400);
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
		throw createError("Board not found", 400);
	}
	return board;
}

export const updatedBoardService = async (boardId, ownerId, title, description, is_public) => {
	const existingBoard = await getBoardByIdModel(ownerId, boardId);

	if (!existingBoard) {
		throw createError("Board not found", 404);
	}
	const trimTitle = title?.trim() || existingBoard.title;
	if (!trimTitle) throw createError('Title is compulsory', 400);
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

export const addBoardMemberService = async (boardId, ownerId, userId, role) => {
	const existingBoard = await getBoardByIdModel(boardId);

	if (!existingBoard) {
		throw createError("Board not found", 404);
	}
	if (existingBoard.owner_id !== ownerId) {
		throw createError("Forbidden", 403);
	}
	const existingUser = await getUserByIdModel(userId);
	if (parseInt(existingUser.id) !== parseInt(userId)) throw createError("User not found", 404);

	const validRoles = ["editor", "viewer"];

	if (!validRoles.includes(role)) {
		throw createError("Invalid role", 400);
	}

	if (ownerId === userId) throw createError('Cannot add owner as member.', 400);
	return addBoardMemberModel(boardId, userId, role);
}

export const getBoardMembersService = async (boardId, ownerId) => {

}