const express = require("express");
const { search } = require("../controllers/search.controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:searchText", authMiddleware, search);

module.exports = router;
