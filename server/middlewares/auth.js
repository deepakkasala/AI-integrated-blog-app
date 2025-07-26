const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  try {
    await jwt.verify(token, process.env.JWT_SECRET);

    // req.id = decoded.id;
    // req.email = decoded.email;
    next();
  } catch (error) {
    res.status(498).json({ message: "Invalid Token", success: false });
  }
};

module.exports = auth;
