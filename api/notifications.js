const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getNotification,
  postNotification,
} = require("../controllers/notifications.controller");

router.get("/", authMiddleware, getNotification);

router.post("/", authMiddleware, postNotification);

module.exports = router;
