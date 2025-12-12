const express = require("express");
const router = express.Router();

const ValidateApiKey = require("../middleware/ValidateApiKey");
const validateToken = require("../middleware/ValidateToken");

const {
  getPublicProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

// publik (read-only) wajib API Key
router.get("/public", ValidateApiKey, getPublicProducts);
router.get("/private/me", validateToken, (req, res) => {
  res.status(200).json({
    message: "Token valid",
    user: req.user,
  });
});
router.post("/private", validateToken, createProduct);
router.put("/private/:id", validateToken, updateProduct);
router.delete("/private/:id", validateToken, deleteProduct);


module.exports = router;
