const express = require("express");
const router = express.Router();

const { tokenGrant } = require("../controllers/AuthController");

router.post("/token", tokenGrant);

module.exports = router;
