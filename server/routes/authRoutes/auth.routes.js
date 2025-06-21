import express from "express";

// Controllers
import {
  register,
  login,
  logout,
  sendVerficationOtp,
  verifyUser,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
  verifyResetOtp,
} from "../../controllers/authController/auth.controller.js";

// middleware
import { userAuth } from "../../middleware/auth.middleware.js";

const authRouter = express.Router();

// Express Routes

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/send-verification-otp", userAuth, sendVerficationOtp);
authRouter.post("/verify-user", userAuth, verifyUser);
authRouter.get("/is-auth", userAuth, isAuthenticated);

authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/verify-reset-otp", verifyResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
