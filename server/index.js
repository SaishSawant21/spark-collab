
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

// Authenticate each Socket.IO connection using the accessToken cookie.
io.use(async (socket, next) => {
    try {
        const req = socket.request;

        cookieParser()(req, {}, () => {});

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
        console.error(
            "Socket authentication failed:",
            error.message
        );

        next(new Error("Unauthorized"));
    }
});

// Send the unique users currently connected to a board.
// Multiple tabs belonging to one user count as one collaborator.
const emitBoardUsers = async (boardId) => {
    try {
        const room = `board-${boardId}`;
        const sockets = await io.in(room).fetchSockets();
        const usersById = new Map();

        for (const participant of sockets) {
            const userId = participant.data.userId;

            if (userId == null) continue;

            const key = String(userId);
            const existingUser = usersById.get(key);

            if (existingUser) {
                existingUser.socketCount += 1;
            } else {
                usersById.set(key, {
                    userId,
                    username: participant.data.username,
                    socketCount: 1,
                });
            }
        }

        io.to(room).emit(
            "board-users",
            Array.from(usersById.values())
        );
    } catch (error) {
        console.error(
            "Failed to update board users:",
            error
        );
    }
};

io.on("connection", (socket) => {
    console.log(
        "Connected:",
        socket.id,
        socket.data.username
    );

    socket.on("join-board", async ({ boardId } = {}) => {
        if (boardId == null || String(boardId).trim() === "") {
            return;
        }

        const previousBoardId = socket.data.boardId;

        // Leave the previous board if this socket switches boards.
        if (
            previousBoardId != null &&
            String(previousBoardId) !== String(boardId)
        ) {
            const previousRoom = `board-${previousBoardId}`;

            socket.leave(previousRoom);

            socket.to(previousRoom).emit("user-disconnected", {
                socketId: socket.id,
            });

            await emitBoardUsers(previousBoardId);
        }

        socket.data.boardId = boardId;

        const room = `board-${boardId}`;

        socket.join(room);

        socket.emit("joined-board", {
            success: true,
            boardId,
        });

        socket.to(room).emit("user-joined", {
            socketId: socket.id,
            userId: socket.data.userId,
            username: socket.data.username,
        });

        await emitBoardUsers(boardId);
    });

    socket.on("element-created", (element) => {
        const boardId = socket.data.boardId;

        if (boardId == null) return;

        socket.to(`board-${boardId}`).emit(
            "element-created",
            element
        );
    });

    socket.on("element-updated", (element) => {
        const boardId = socket.data.boardId;

        if (boardId == null) return;

        socket.to(`board-${boardId}`).emit(
            "element-updated",
            element
        );
    });

    socket.on("element-deleted", (elementId) => {
        const boardId = socket.data.boardId;

        if (boardId == null) return;

        socket.to(`board-${boardId}`).emit(
            "element-deleted",
            elementId
        );
    });

    socket.on("elements-replaced", (elements) => {
        const boardId = socket.data.boardId;

        if (boardId == null) return;

        socket.to(`board-${boardId}`).emit(
            "elements-replaced",
            elements
        );
    });

    socket.on("element-selected", ({ elementId } = {}) => {
        const boardId = socket.data.boardId;

        if (boardId == null) return;

        socket.to(`board-${boardId}`).emit(
            "element-selected",
            {
                socketId: socket.id,
                elementId,
            }
        );
    });

    socket.on("element-deselected", () => {
        const boardId = socket.data.boardId;

        if (boardId == null) return;

        socket.to(`board-${boardId}`).emit(
            "element-deselected",
            {
                socketId: socket.id,
            }
        );
    });

    socket.on("cursor-moved", ({ x, y } = {}) => {
        const boardId = socket.data.boardId;

        if (boardId == null) return;
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;

        socket.to(`board-${boardId}`).emit(
            "cursor-moved",
            {
                socketId: socket.id,
                username: socket.data.username || "Collaborator",
                x,
                y,
            }
        );
    });

    socket.on("disconnect", async (reason) => {
        const boardId = socket.data.boardId;

        console.log(
            "Disconnected:",
            socket.id,
            reason
        );

        if (boardId == null) return;

        const room = `board-${boardId}`;

        socket.to(room).emit("user-disconnected", {
            socketId: socket.id,
        });

        await emitBoardUsers(boardId);
    });
});

server.listen(port, () => {
    console.log("Running on port", port);
});
