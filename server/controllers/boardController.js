import { createBoardService, deleteBoardService, getBoardByIdService, getBoardsSerive, updatedBoardService } from "../services/boardService.js";

export const createBoard = async (req, res) => {
	try {
		const { title, description, is_public } = req.body;
		const ownerId = req.user.id;
		const board = await createBoardService(title, description, is_public, ownerId);
		return res.status(201).json({
			code: 201,
			message: 'Board successfully created'
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			code: 500,
			message: 'Something went wrong'
		})
	}
}

export const getBoards = async (req, res) => {
	try {
		const ownerId = req.user.id;
		const boards = await getBoardsSerive(ownerId);
		return res.status(200).json({
			code: 200,
			message: 'Boards fetched successfully',
			boards
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			code: 500,
			message: 'Something went wrong'
		})
	}
}

export const getBoardById = async (req, res) => {
	try {
		const ownerId = req.user.id;
		const boardId = parseInt(req.params.id);
		const boardData = await getBoardByIdService(ownerId, boardId);
		return res.status(200).json({
			code: 200,
			message: 'Board fetched successfully'
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			code: 500,
			message: 'Something went wrong'
		})
	}
}

export const updatedBoard = async (req, res) => {
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
		console.log(error);
		return res.status(500).json({
			code: 500,
			message: 'Something went wrong'
		})
	}
}

export const deleteBoard = async (req, res) => {
	try {
		const ownerId = parseInt(req.user.id);
		const boardId = parseInt(req.params.id);
		const board = await deleteBoardService(ownerId, boardId);
		return res.status(200).json({
			code: 200,
			message: 'Board deleted successfully',
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			code: 500,
			message: 'Something went wrong'
		})
	}
}