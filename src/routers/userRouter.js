import express from "express";
import { logout, getEdit, postEdit, getChangePassword, postChangePassword, deleteUser, see, initGithubLogin, callbackGithubLogin } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/edit/password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/delete", deleteUser);
userRouter.get("/:id([0-9a-f]{24})", see);
userRouter.get("/github/init", publicOnlyMiddleware, initGithubLogin);
userRouter.get("/github/callback", publicOnlyMiddleware, callbackGithubLogin);

export default userRouter;