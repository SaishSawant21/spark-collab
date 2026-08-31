import express from 'express';
import app from './app.js';
import db from './config/db.js';
import http from 'http';
import { Server } from 'socket.io';

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
    "http://localhost:5173",
    "http://localhost:8080",
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
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

    socket.on("disconnect", (reason) => {
        console.log("Disconnected:", socket.id, reason);
    });
});

server.listen(port, () => {
    console.log("Running on port", port);
});
