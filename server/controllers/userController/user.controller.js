import userModel from "../../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized user, login again",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const { _id, name, email, isAccountVerified } = user;

    res.json({
      success: true,
      userData: { _id, name, email, isAccountVerified },
    });
  } catch (err) {
    console.error("🔥 getUserData controller error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
