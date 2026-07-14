import express from 'express';
import { createBoard, getBoardById, getBoards } from '../controllers/boardController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createBoard);
router.get('/', verifyToken, getBoards);
router.get('/:id', verifyToken, getBoardById);
export default router;