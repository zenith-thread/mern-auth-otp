import bcrypt from "bcryptjs";

// Model
import userModel from "../../models/userModel.js";

// Nodemailer
import transporter from "../../config/nodemailer.js";

// Helper functions
import {
  generateJwtToken,
  generateTokenInCookie,
  sendWelcomeEmail,
  generateOTP,
  sendOtpEmail,
  OTP_TYPES,
} from "../../helperFunctions/auth.helper.js";

// REGISTERATION / SIGN UP
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = generateJwtToken(user._id);

    generateTokenInCookie(res, token);

    // Send Welcome Email
    const mailOptions = sendWelcomeEmail(email);
    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .json({ success: true, message: "User created in the database." });
  } catch (err) {
    console.error("register controller error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are requried",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateJwtToken(user._id);

    generateTokenInCookie(res, token);

    return res.json({ success: true, message: "logged in" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// LOG OUT USER

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
      success: true,
      message: "User logged out",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// USER EMAIL VERIFICATION

// send verification OTP to user's email
export const sendVerficationOtp = async (req, res) => {
  try {
    const { userId } = req;
    const user = await userModel.findById(userId);

    // user doesn't exist
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with the provided ID doesn't exist.",
      });
    }

    // user exists but account is already verified
    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "User account is already verified.",
      });
    }

    // generate a random otp and send otp to user's email for verification
    const otp = generateOTP();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000; // Expires in 5 minutes

    await user.save();

    const mailOptions = sendOtpEmail(user.email, otp, OTP_TYPES.verify);
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Verification OTP sent on email",
    });
  } catch (err) {
    console.error("sendVerificationOtp controller error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// verify the email using OTP
export const verifyUser = async (req, res) => {
  try {
    const { otp, userId } = req.body;
    const user = await userModel.findById(userId);

    // userid or email is missing
    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email or OTP is missing",
      });
    }

    // user doesn't exist
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with the provided ID doesn't exist.",
      });
    }

    // user exists but account is already verified
    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "User account is already verified.",
      });
    }

    // provided otp doesn't match the one stored in the user's document in database.
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // otp is expired
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    // otp correct and the user is verified
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    res.json({
      success: true,
      message: "Email Verified Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Check if the user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true, message: "User is authenticated" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// USER PASSWORD RESET

// send reset OTP to user's email
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "User Email is missing",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const otp = generateOTP();
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000; // otp expires in 5 minutes

    await user.save();

    const mailOptions = sendOtpEmail(user.email, otp, OTP_TYPES.reset);
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Reset OTP sent to user's email",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// reset user password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email or OTP or New Password is missing",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    res.json({
      success: true,
      message: "Password has been updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
