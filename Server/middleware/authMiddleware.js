
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization Header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Please login first.",
      });
    }

    // Get Token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token is missing.",
      });
    }

    // Verify JWT Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Check Decoded Token
    if (!decoded || typeof decoded !== "object") {
      return res.status(401).json({
        message: "Invalid authentication token.",
      });
    }

    // Get MongoDB User ID
    const userId =
      decoded.id ||
      decoded._id ||
      decoded.userId ||
      decoded.sub;

    if (!userId) {
      return res.status(401).json({
        message: "User ID not found in authentication token.",
      });
    }

    // Set Authenticated User
    req.user = {
      ...decoded,
      id: userId,
    };

    next();

  } catch (error) {
    console.error("Authentication Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;
