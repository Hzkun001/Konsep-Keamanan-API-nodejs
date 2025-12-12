# Konsep API Key & OAuth2 (JWT)

Proyek ini adalah contoh layanan Express + MongoDB yang mencontohkan proteksi API publik dengan API Key dan proteksi private dengan JWT bearer token. Fitur utama:
- Pembuatan access token via `/api/v1/auth/token`
- Akses produk publik dengan `x-api-key`
- Akses/CRUD produk private dengan bearer token (role admin)
- Membedakan akses public dan protected endpoint
- Mengelola data Product menggunakan MongoDB
- Melakukan pengujian API menggunakan Postman

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- dotenv
- Postman

---

## Persiapan
1) Pastikan Node.js dan MongoDB Atlas/instance tersedia.
2) Duplikasi `.env` dari contoh berikut:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wse10
JWT_SECRET=supersecretjwt
```
3) Instal dependensi:
```
npm install
```
4) Seed data awal (produk, API key, user/admin):
```
node seeders/seed.js
```

## Menjalankan server
```
node server.js
```
Server akan berjalan di `http://localhost:3000`.

## Endpoints
- `GET /` — health check.
- `POST /api/v1/auth/token` — body `{ "username": "...", "password": "..." }`, mengembalikan bearer token 1 jam.
- `GET /api/v1/products/public` — header `x-api-key: <API_KEY>`, menampilkan daftar produk publik.
- `GET /api/v1/products/private/me` — header `Authorization: Bearer <TOKEN>`, validasi token.
- `POST /api/v1/products/private` — buat produk baru (hanya `role: admin`), body `{ name, price, stock }`.
- `PUT /api/v1/products/private/:id` — update produk (admin).
- `DELETE /api/v1/products/private/:id` — hapus produk (admin).

## Struktur Folder
```text
.
├── controllers
│   ├── authController.js
│   └── productController.js
├── middleware
│   └── authMiddleware.js
├── models
│   ├── User.js
│   └── Product.js
├── routes
│   ├── AuthRoutes.js
│   └── ProductRoutes.js
├── .env
├── server.js
├── package.json
└── README.md
```
## Alur singkat
1) Dapatkan bearer token dengan kredensial user/admin seed (`admin/password123`, `hafidz/password`, `userbiasa/userpass`).
2) Simpan token dan gunakan pada header `Authorization: Bearer <TOKEN>` untuk endpoint private.
3) Untuk akses publik, gunakan API key seed seperti `key123` pada header `x-api-key`.

## Catatan keamanan
- Ganti `JWT_SECRET`, `MONGODB_URI`, dan nilai seed di lingkungan produksi.
- Token dan API key dikirim via header; simpan di sisi klien secara aman.
