const express = require("express");
const { auth, postAuth } = require("../controllers/auth.controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, auth);

router.post("/", postAuth);

module.exports = router;
