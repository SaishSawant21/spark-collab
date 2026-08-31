import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import boardRoutes from './routes/boardRoutes.js';
import boardElementRoutes from './routes/boardElementRoutes.js'
import { errorHandler } from './middlewares/errorMiddleware.js';
import cors from "cors";
const app = express();
const allowedOrigins = [
  "https://spark-collab-client.onrender.com",
  "http://localhost:5173",
  "http://localhost:8080",
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/boards', boardElementRoutes);
app.use(errorHandler);
export default app;
