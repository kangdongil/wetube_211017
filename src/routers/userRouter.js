import express from "express";
import { logout, getEdit, postEdit, deleteUser, see, initGithubLogin, callbackGithubLogin } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/delete", deleteUser);
userRouter.get(":id(\\d+)", see);
userRouter.get("/github/init", publicOnlyMiddleware, initGithubLogin);
userRouter.get("/github/callback", publicOnlyMiddleware, callbackGithubLogin);

export default userRouter;