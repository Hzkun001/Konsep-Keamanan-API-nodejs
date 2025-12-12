const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    owner: { type: String, default: "public-client" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApiKey", apiKeySchema);
