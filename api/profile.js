const express = require("express");
const {
  getProfile,
  getPostOfUser,
  getFollowersOfUser,
  getFollowingOfUser,
  postFollowAUser,
  putFollowAUser,
  postUpdateProfile,
  postUpdatePassword,
  postUpdateMessagePopup,
} = require("../controllers/profile.controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// lấy ra thông tin user
router.get("/:username", authMiddleware, getProfile);

// lấy những bài viết của user
router.get(`/posts/:username`, authMiddleware, getPostOfUser);

// lấy những người theo dõi user
router.get("/followers/:userId", authMiddleware, getFollowersOfUser);

// lấy những người user đang theo dõi
router.get("/following/:userId", authMiddleware, getFollowingOfUser);

// Theo dõi user
router.post("/follow/:userToFollowId", authMiddleware, postFollowAUser);

// bỏ theo dõi user
router.put("/unfollow/:userToUnfollowId", authMiddleware, putFollowAUser);

// sửa trang cá nhân
router.post("/update", authMiddleware, postUpdateProfile);

// cập nhật mật khẩu
router.post("/settings/password", authMiddleware, postUpdatePassword);

// cập nhật đóng mở thông báo mess
router.post("/settings/messagePopup", authMiddleware, postUpdateMessagePopup);

module.exports = router;
