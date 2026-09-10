import express from 'express';
import { fetchAllUsers, forgotPassword, getMe, getProfile, login, logOut, register, resetPassword, updateProfile, verifyResetToken } from './../controllers/authController.js';
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
router.post('/forgot-password', forgotPassword);
router.get("/verify-reset-token", verifyResetToken);
router.post("/reset-password", resetPassword);
export default router;