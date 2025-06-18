import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not Authorized, login again",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // get the userId from the decoded token to be sent to the controller
    if (decodedToken.id) {
      req.body.userId = decodedToken.id;
    } else {
      return res.status(400).json({
        success: false,
        message: "Not Authorized, login again",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
