import { Router } from "express";
import userGetController from "./../controllers/user-get.controller.js";
import userGetAllController from "./../controllers/user-getAll.controller.js";
import userRegisterDTO from "./../dto/user-register.dto.js";
import userRegisterController from "./../controllers/user-register.controller.js";
import userUpdateDTO from "./../dto/user-update.dto.js";
import userUpdateController from "./../controllers/user-update.controller.js";
import userUpdateNameDTO from "../dto/user-update-name.dto.js";
import userUpdateNameController from "../controllers/user-update-name.controller.js";
import userDeleteDTO from "./../dto/user-delete.dto.js";
import userDeleteController from "./../controllers/user-delete.controller.js";

const userRouter = Router();

// Api REST Methods
userRouter.get("/users", userGetAllController);
userRouter.get("/users/:id", userGetController);
userRouter.post("/users", userRegisterDTO, userRegisterController);
userRouter.put("users/:id", userUpdateDTO, userUpdateController);
userRouter.patch("/users/:id", userUpdateNameDTO, userUpdateNameController);
userRouter.delete("/users/:id", userDeleteDTO, userDeleteController);

// Login + Auth

export default userRouter;
