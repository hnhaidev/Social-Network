const express = require("express");
const {
  postResetEmail,
  postUpdatePass,
} = require("../controllers/reset.controller");
const router = express.Router();

// Kiểm tra email và gửi email để đặt lại mật khẩu
router.post("/", postResetEmail);

// xác minh TOCKEN và đặt lại mật khẩu trong MongoDB
router.post("/token", postUpdatePass);

module.exports = router;
