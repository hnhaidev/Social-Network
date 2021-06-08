const express = require("express");
const router = express.Router();
const {
  createPost,
  getPost,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  getAllLikePost,
  createComment,
  deleteComment,
} = require("../controllers/posts.controller");
const authMiddleware = require("../middleware/authMiddleware");

// tạo bài viết
router.post("/", authMiddleware, createPost);

// lấy ra tất cả các bài viết
router.get("/", authMiddleware, getPost);

// lấy ra bài viết theo id
router.get("/:postId", authMiddleware, getPostById);

// xóa bài viết
router.delete("/:postId", authMiddleware, deletePost);

// like bài viết
router.post("/like/:postId", authMiddleware, likePost);

// UNLIKE bài viết
router.put("/unlike/:postId", authMiddleware, unlikePost);

// lấy ra tất cả các like của một bài viết
router.get("/like/:postId", authMiddleware, getAllLikePost);

// tạo cmt
router.post("/comment/:postId", authMiddleware, createComment);

// xóa cmt
router.delete("/:postId/:commentId", authMiddleware, deleteComment);

module.exports = router;
