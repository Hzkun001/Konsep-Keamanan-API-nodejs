require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ProductRoutes = require("./routes/ProductRoutes");
const AuthRoutes = require("./routes/AuthRoutes");

const app = express();
app.use(express.json());
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/auth", AuthRoutes);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Koneksi ke MongoDB Atlas Berhasil!");
  } catch (err) {
    console.error("❌ GAGAL KONEK MongoDB:", err.message);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server berjalan!",
    praktikum: "P10 - Simulasi API Key & OAuth2 (JWT)",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
});
