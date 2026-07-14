import express from 'express';
import { createBoard } from '../controllers/boardController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-board', verifyToken, createBoard);

export default router;