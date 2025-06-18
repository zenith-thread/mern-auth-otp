import express from "express";

// controllers
import { getUserData } from "../../controllers/userController/user.controller.js";

// middleware
import { userAuth } from "../../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);

export default userRouter;
