import express from "express";

// Controllers
import {
  register,
  login,
  logout,
} from "../../controllers/authController/auth.controller.js";

const authRouter = express.Router();

// Express Routes

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
