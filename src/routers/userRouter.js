import express from "express";
import { logout, edit, deleteUser, see, initGithubLogin, callbackGithubLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);
userRouter.get(":id(\\d+)", see);
userRouter.get("/github/init", initGithubLogin);
userRouter.get("/github/callback", callbackGithubLogin);

export default userRouter;