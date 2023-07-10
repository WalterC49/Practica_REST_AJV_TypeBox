import { Router } from "express";
import registerValidateSchema from "./../dto/user-register.dto.js";
import userRegisterController from "./../controllers/user-register.controller.js";

const userRouter = Router();

userRouter.post("/user", registerValidateSchema, userRegisterController);

export default userRouter;
