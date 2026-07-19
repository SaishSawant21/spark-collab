import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { addBoardElement, getBoardElement, updateBoardElement } from '../controllers/boardElementController.js';

const router = express.Router();

router.post('/:boardId/elements', verifyToken, addBoardElement);
router.get('/:boardId/elements', verifyToken, getBoardElement);
router.put('/:elementId/elements', verifyToken, updateBoardElement);

export default router;