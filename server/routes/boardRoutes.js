import express from 'express';
import { addBoardMember, createBoard, deleteBoard, getBoardById, getBoardMembers, getBoards, updatedBoard } from '../controllers/boardController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createBoard);
router.get('/', verifyToken, getBoards);
router.get('/:id', verifyToken, getBoardById);
router.put('/:id', verifyToken, updatedBoard);
router.delete('/:id', verifyToken, deleteBoard);
router.post('/:boardId/members', verifyToken, addBoardMember);
router.get('/:boardId/members', verifyToken, getBoardMembers);

export default router;