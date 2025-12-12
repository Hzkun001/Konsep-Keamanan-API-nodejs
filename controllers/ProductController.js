const Product = require("../models/Product");

// PUBLIC
async function getPublicProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "OK",
      apiKeyOwner: req.apiKeyOwner,
      count: products.length,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

// PRIVATE - helper: wajib admin
function requireAdmin(req, res) {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Akses ditolak: hanya admin" });
    return false;
  }
  return true;
}

// CREATE
async function createProduct(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    const { name, price, stock } = req.body;
    if (!name || price == null || stock == null) {
      return res.status(400).json({ message: "name, price, stock wajib diisi" });
    }

    const product = await Product.create({ name, price, stock });
    return res.status(201).json({ message: "Produk dibuat", data: product });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

// UPDATE
async function updateProduct(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      { name, price, stock },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Produk tidak ditemukan" });

    return res.status(200).json({ message: "Produk diupdate", data: updated });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

// DELETE
async function deleteProduct(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Produk tidak ditemukan" });

    return res.status(200).json({ message: "Produk dihapus", data: deleted });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  getPublicProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};