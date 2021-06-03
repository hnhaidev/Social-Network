const express = require("express");
const { suggested } = require("../controllers/suggested.controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, suggested);

module.exports = router;
