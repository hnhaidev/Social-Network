const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getChats,
  getUserInfo,
  deleteChat,
} = require("../controllers/chats.controller");

// GET ALL CHATS
router.get("/", authMiddleware, getChats);

// GET USER INFO
router.get("/user/:userToFindId", authMiddleware, getUserInfo);

// Delete a chat
router.delete(`/:messagesWith`, authMiddleware, deleteChat);

module.exports = router;
