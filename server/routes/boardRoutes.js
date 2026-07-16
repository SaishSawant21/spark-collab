import express from 'express';
import { createBoard, deleteBoard, getBoardById, getBoards, updatedBoard } from '../controllers/boardController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createBoard);
router.get('/', verifyToken, getBoards);
router.get('/:id', verifyToken, getBoardById);
router.put('/:id', verifyToken, updatedBoard);
router.delete('/:id', verifyToken, deleteBoard);

export default router;