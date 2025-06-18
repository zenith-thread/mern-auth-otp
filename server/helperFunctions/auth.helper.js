import jwt from "jsonwebtoken";

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
  from: process.env.BREVO_SENDER_EMAIL,
  to: email,
  subject: "Welcome to Zenith authentication system",
  text: `Welcome to Zenith authentication system. Your account has been successfully been created with email id: ${email}`,
});

export const OTP_TYPES = {
  verify: "verify",
  reset: "reset",
};

export const sendOtpEmail = (email, otp, otpType) => ({
  from: process.env.BREVO_SENDER_EMAIL,
  to: email,
  subject: `${
    otpType === OTP_TYPES.verify
      ? "Account Verification OTP"
      : "Password Reset OTP"
  }`,
  text: `Your OTP is ${otp}. ${
    otpType === OTP_TYPES.verify
      ? "Verify your account using this OTP"
      : "Use this OTP to proceed with resetting your password"
  }`,
});
// Generates a 6-digit random OTP number
export const generateOTP = () =>
  String(Math.floor(100000 + Math.random() * 900000));
