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

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("join-board", ({ boardId }) => {
        console.log(`${socket.id} joined board ${boardId}`);

        socket.join(`board-${boardId}`);

        // Send confirmation to the user who joined
        console.log("Sending joined-board");

        setTimeout(() => {
            console.log("Emitting joined-board");

            socket.emit("joined-board", {
                success: true,
                boardId
            });
        }, 2000);

        console.log("Sent");
        socket.onAnyOutgoing((event, ...args) => {
            console.log("Sent:", event, args);
        });

        // Notify everyone else in the room
        socket.to(`board-${boardId}`).emit("user-joined", {
            socketId: socket.id
        });
    });

    socket.on("disconnect", (reason) => {
        console.log("Disconnected:", socket.id, reason);
    });
});

server.listen(port, () => {
    console.log("Running on port", port);
});