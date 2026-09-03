import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config({ path: ".env.local" });

export const generateWebAccessToken = (user) => {
    let payload = {
        id: user.id,
        username: user.username
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}