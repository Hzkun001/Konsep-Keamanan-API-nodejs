const ApiKey = require("../models/ApiKey");

async function validateApiKey(req, res, next) {
  try {
    const apiKey = req.header("x-api-key"); // ambil dari header

    if (!apiKey) {
      return res.status(401).json({ message: "x-api-key wajib diisi" });
    }

    const keyDoc = await ApiKey.findOne({ key: apiKey, isActive: true });

    if (!keyDoc) {
      return res.status(401).json({ message: "API Key tidak valid / nonaktif" });
    }

    // opsional: tempel info pemilik key
    req.apiKeyOwner = keyDoc.owner;

    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = validateApiKey;
