import { Router } from "express";
import userGetController from "./../controllers/user-get.controller.js";
import userGetAllController from "./../controllers/user-getAll.controller.js";
import userRegisterDTO from "./../dto/user-register.dto.js";
import userRegisterController from "./../controllers/user-register.controller.js";
import userUpdateDTO from "./../dto/user-update.dto.js";
import userUpdateController from "./../controllers/user-update.controller.js";
import userUpdateNameDTO from "./../dto/user-update-name.dto.js";
import userUpdateNameController from "./../controllers/user-update-name.controller.js";
import userDeleteDTO from "./../dto/user-delete.dto.js";
import userDeleteController from "./../controllers/user-delete.controller.js";
import userLoginDTO from "./../dto/user-login.dto.js";
import userLoginController from "./../controllers/user-login.controller.js";
import userJWTDTO from "../dto/user-jwt.dto.js";
import userProfileController from "../controllers/user-profile.controller.js";

const userRouter = Router();

// Api REST Methods
userRouter.get("/users", userGetAllController);
userRouter.get("/users/:id", userGetController);
userRouter.post("/users", userRegisterDTO, userRegisterController);
userRouter.put("/users/:id", userUpdateDTO, userJWTDTO, userUpdateController);
userRouter.patch(
  "/users/:id",
  userUpdateNameDTO,
  userJWTDTO,
  userUpdateNameController,
);
userRouter.delete(
  "/users/:id",
  userDeleteDTO,
  userJWTDTO,
  userDeleteController,
);

// Login + Auth
userRouter.post("/login", userLoginDTO, userLoginController);
userRouter.get("/profile", userJWTDTO, userProfileController);

export default userRouter;
