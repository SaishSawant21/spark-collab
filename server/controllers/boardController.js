import { addBoardMemberService, createBoardService, deleteBoardService, getBoardByIdService, getBoardMembersService, getBoardsSerive, removeBoardMemberService, updatedBoardService } from "../services/boardService.js";

export const createBoard = async (req, res, next) => {
	try {
		const { title, description, is_public } = req.body;
		const ownerId = req.user.id;
		const board = await createBoardService(title, description, is_public, ownerId);
		return res.status(201).json({
			code: 201,
			message: 'Board successfully created'
		})
	} catch (error) {
		next(error);
	}
}

export const getBoards = async (req, res, next) => {
	try {
		const ownerId = req.user.id;
		const boards = await getBoardsSerive(ownerId);
		return res.status(200).json({
			code: 200,
			message: 'Boards fetched successfully',
			boards
		})
	} catch (error) {
		next(error);
	}
}

export const getBoardById = async (req, res, next) => {
	try {
		const ownerId = req.user.id;
		const boardId = parseInt(req.params.id);
		const boardData = await getBoardByIdService(ownerId, boardId);
		return res.status(200).json({
			code: 200,
			message: 'Board fetched successfully'
		})
	} catch (error) {
		next(error);
	}
}

export const updatedBoard = async (req, res, next) => {
	try {
		const { title, description, is_public } = req.body;
		const ownerId = parseInt(req.user.id);
		const boardId = parseInt(req.params.id);
		const board = await updatedBoardService(boardId, ownerId, title, description, is_public);
		return res.status(200).json({
			code: 200,
			message: 'Board updated successfully',
		})
	} catch (error) {
		next(error);
	}
}

export const deleteBoard = async (req, res, next) => {
	try {
		const ownerId = parseInt(req.user.id);
		const boardId = parseInt(req.params.id);
		const board = await deleteBoardService(ownerId, boardId);
		return res.status(200).json({
			code: 200,
			message: 'Board deleted successfully',
		})
	} catch (error) {
		next(error);
	}
}

export const addBoardMember = async (req, res, next) => {
	try {
		const boardId = parseInt(req.params.boardId);
		const ownerId = parseInt(req.user.id);
		const { role, userId } = req.body;
		const addMember = await addBoardMemberService(boardId, ownerId, userId, role);
		return res.status(201).json({
			code: 201,
			message: 'Member added successfully',
		})
	} catch (error) {
		next(error);
	}
}

export const getBoardMembers = async (req, res, next) => {
	try {
		const boardId = parseInt(req.params.boardId);
		const userId = req.user.id;
		const boardMembers = await getBoardMembersService(boardId, userId);
		return res.status(200).json({
			code: 200,
			message: "Board members fetched successfully.",
			boardMembers
		});
	} catch (error) {
		next(error);
	}
}

export const removeBoardMember = async (req, res, next) => {
	try {
		const boardId = parseInt(req.params.boardId);
		const ownerId = parseInt(req.user.id);
		const userId = parseInt(req.body.userId);
		if (!userId) {
			throw createError("User ID is required", 400);
		}
		await removeBoardMemberService(boardId, ownerId, userId);
		return res.status(200).json({
			code: 200,
			message: 'Removed board member successfully'
		})
	} catch (error) {
		next(error);
	}
}