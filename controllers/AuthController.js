const User = require("../models/User");
const generateToken = require("../utils/generateToken");

async function tokenGrant(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username dan password wajib diisi" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Kredensial salah" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Kredensial salah" });
    }

    const accessToken = generateToken({
      user_id: user._id,
      role: user.role,
    });

    return res.status(200).json({
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 500600,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = { tokenGrant };
