import express from 'express';
import { fetchAllUsers, getMe, getProfile, login, logOut, register, updateProfile } from './../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Auth routes");
});

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.get('/myProfile', verifyToken, getProfile);
router.get('/fetch-users', verifyToken, fetchAllUsers);
router.put('/update-profile', verifyToken, updateProfile);
router.get('/logout', logOut);

export default router;