import express from "express";
// import {registerRouter,  loginUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { registerUser,loginUser, getProfile, updateProfile, googleLogin } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser)
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/update-profile", authMiddleware, updateProfile);
userRouter.post("/google", googleLogin);


export default userRouter;