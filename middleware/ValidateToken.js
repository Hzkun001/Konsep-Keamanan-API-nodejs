const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Token tidak ada / format salah" });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // simpan hasil decode ke request
    req.user = decoded; // { user_id, role, iat, exp }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid / expired", error: err.message });
  }
}

module.exports = validateToken;
