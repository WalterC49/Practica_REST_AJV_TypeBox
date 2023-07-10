import express from "express";
import userRouter from "../routes/user.routes.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api", userRouter);

export default app;
