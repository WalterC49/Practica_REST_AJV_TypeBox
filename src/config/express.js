import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "../routes/user.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRouter);

export default app;
