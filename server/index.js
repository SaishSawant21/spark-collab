import express from 'express';
import app from './app.js';
import db from './config/db.js';
import http from 'http';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { verifyAccessToken } from './utils/jwt.js';
import { getUserByIdModel } from './models/userModel.js';

const port = 3000;

async function checkConnection() {
    try {
        await db.connect();
        console.log('Success');
    } catch (error) {
        console.log(error);
    }
}

checkConnection();

const server = http.createServer(app);
const allowedOrigins = [
    "https://spark-collab-client.onrender.com",
    "http://localhost:5173",
    "http://localhost:8080",
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
});

io.use(async (socket, next) => {
    try {
        const req = socket.request;

        cookieParser()(req, {}, () => { });

        const token = req.cookies?.accessToken;

        if (!token) {
            return next(new Error("Unauthorized"));
        }

        const decoded = verifyAccessToken(token);
        const userId = decoded.id || decoded.sub;

        if (!userId) {
            return next(new Error("Invalid token"));
        }

        const user = await getUserByIdModel(userId);

        if (!user) {
            return next(new Error("User not found"));
        }

        socket.data.userId = user.id;
        socket.data.username = user.username;

        next();
    } catch (error) {
        console.error("Socket authentication failed:", error);
        next(new Error("Unauthorized"));
    }
});

io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("join-board", ({ boardId }) => {
        console.log(`${socket.id} joined board ${boardId}`);

        socket.join(`board-${boardId}`);

        socket.data.boardId = boardId;

        socket.emit("joined-board", {
            success: true,
            boardId,
        });

        socket.to(`board-${boardId}`).emit("user-joined", {
            socketId: socket.id,
        });
    });

    socket.on("element-created", (element) => {
        const boardId = socket.data.boardId;
        if (!boardId) return;
        socket.to(`board-${boardId}`).emit("element-created", element);
    })

    socket.on("element-updated", (element) => {
        const boardId = socket.data.boardId;

        if (!boardId) return;

        socket.to(`board-${boardId}`).emit("element-updated", element);
    });

    socket.on("element-deleted", (elementId) => {
        const boardId = socket.data.boardId;

        if (!boardId) return;

        socket.to(`board-${boardId}`).emit("element-deleted", elementId);
    });

    socket.on("elements-replaced", (elements) => {
        const boardId = socket.data.boardId;

        if (!boardId) return;

        socket.to(`board-${boardId}`).emit("elements-replaced", elements);
    });

    socket.on("element-selected", ({ elementId }) => {
        const boardId = socket.data.boardId;

        if (!boardId) return;

        socket.to(`board-${boardId}`).emit("element-selected", {
            socketId: socket.id,
            elementId,
        });
    });

    socket.on("element-deselected", () => {
        const boardId = socket.data.boardId;

        if (!boardId) return;

        socket.to(`board-${boardId}`).emit("element-deselected", {
            socketId: socket.id,
        });
    });

    socket.on("cursor-moved", ({ x, y }) => {
        const boardId = socket.data.boardId;
        const username = socket.data.username;

        console.log("Cursor received:", {
            socketId: socket.id,
            boardId,
            username,
            x,
            y,
        });

        if (!boardId) return;

        socket.to(`board-${boardId}`).emit("cursor-moved", {
            socketId: socket.id,
            username: username || "Collaborator",
            x,
            y,
        });
    });
    
    socket.on("disconnect", (reason) => {
        console.log("Disconnected:", socket.id, reason);
    });
});

server.listen(port, () => {
    console.log("Running on port", port);
});
