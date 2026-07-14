import express from 'express';
import {getMe, login, logOut, register} from './../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Auth routes");
});

router.post('/register',register);
router.post('/login',login);
router.get('/me',verifyToken,getMe);
router.get('/logout',logOut);

export default router;