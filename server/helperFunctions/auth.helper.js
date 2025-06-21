import jwt from "jsonwebtoken";

// Email Templates
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "../config/emailTemplates.js";

export const generateJwtToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

export const generateTokenInCookie = (res, token) =>
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // converting 7 days to miliseconds
  });

export const sendWelcomeEmail = (email) => ({
  from: process.env.SENDGRID_SENDER_EMAIL,
  to: email,
  subject: "Welcome to MERN Auth System",
  text: `Welcome to Zenith authentication system. Your account has been successfully been created with email id: ${email}`,
});

export const OTP_TYPES = {
  verify: "verify",
  reset: "reset",
};

export const sendOtpEmail = (email, otp, otpType) => ({
  from: process.env.SENDGRID_SENDER_EMAIL,
  to: email,
  subject: `${
    otpType === OTP_TYPES.verify
      ? "Account Verification OTP"
      : "Password Reset OTP"
  }`,
  html:
    otpType === OTP_TYPES.verify
      ? EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
          "{{email}}",
          email
        )
      : PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
          "{{email}}",
          email
        ),
});
// Generates a 6-digit random OTP number
export const generateOTP = () =>
  String(Math.floor(100000 + Math.random() * 900000));
