const jwt = require("jsonwebtoken");
const config = require("../configurations/config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "Token không được cung cấp" });
  }

  jwt.verify(token, config.secret_key, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token không hợp lệ hoặc hết hạn" });
    }
    req.user = user; // gắn user vào req
    next();
  });
}

module.exports = authMiddleware;
