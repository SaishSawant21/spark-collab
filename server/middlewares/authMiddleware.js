import express from 'express';
import dotenv from 'dotenv';
import { verifyAccessToken } from '../utils/jwt.js';
dotenv.config({ path: ".env.local" });

export const verifyToken = (req,res,next) => {
    try{
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({
            code: 401,
            message: 'Unauthorized'
        })
    }
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
    }catch(error){
        console.log('Error: ',error);
        return res.status(401).json({
            code: 401,
            message: 'Unauthorized'
        })
    }
}