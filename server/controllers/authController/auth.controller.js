import bcrypt from "bcryptjs";

// Model
import userModel from "../../models/userModel.js";

// Helper functions
import {
  generateJwtToken,
  generateTokenInCookie,
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

    return res
      .status(201)
      .json({ success: true, message: "User created in the database." });
  } catch (err) {
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
