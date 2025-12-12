require("dotenv").config();
const mongoose = require("mongoose");

const Product = require("../models/Product");
const ApiKey = require("../models/ApiKey");
const User = require("../models/User");

async function runSeed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Seeder: konek MongoDB");

    // bersihin dulu biar repeatable
    await Product.deleteMany({});
    await ApiKey.deleteMany({});
    await User.deleteMany({});

    // seed products
    await Product.insertMany([
      { name: "Produk A", price: 10000, stock: 10 },
      { name: "Produk B", price: 25000, stock: 5 },
      { name: "Produk C", price: 5000, stock: 50 },
    ]);

    // seed api keys
    await ApiKey.insertMany([
      { key: "key123", owner: "public-app-A", isActive: true },
      { key: "PRACTICUM_API_KEY_B_ABCDEFGHIJ", owner: "public-app-B", isActive: true },
    ]);

    // seed users dan admin
    await User.create([
        { username: "admin", password: "password123", role: "admin" },
        { username: "hafidz", password: "password", role: "admin" },
        { username: "userbiasa", password: "userpass", role: "user" },
    ]);

    console.log("✅ Seeding selesai: products, apikeys, users dibuat");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder error:", err.message);
    process.exit(1);
  }
}

runSeed();
