const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getChats,
  getUserInfo,
  deleteChat,
} = require("../controllers/chats.controller");

// xuất tất cả các chats hiện có
router.get("/", authMiddleware, getChats);

// lấy ra user theo id
router.get("/user/:userToFindId", authMiddleware, getUserInfo);

// xóa chat
router.delete(`/:messagesWith`, authMiddleware, deleteChat);

module.exports = router;
