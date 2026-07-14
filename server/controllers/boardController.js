import { createBoardService } from "../services/boardService.js";

export const createBoard = async (req, res) => {
    try {
        const { title, description, is_public } = req.body;
        const ownerId = req.user.id;
        const board = await createBoardService(title, description, is_public, ownerId);
        return res.status(201).json({
            code: 201,
            message: 'Board successfully created',
            board
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            code: 500,
            message: 'Something went wrong'
        })
    }
}

