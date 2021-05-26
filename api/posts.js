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

// CREATE A POST
router.post("/", authMiddleware, createPost);

// GET ALL POSTS
router.get("/", authMiddleware, getPost);

// GET POST BY ID
router.get("/:postId", authMiddleware, getPostById);

// DELETE POST
router.delete("/:postId", authMiddleware, deletePost);

// LIKE A POST
router.post("/like/:postId", authMiddleware, likePost);

// UNLIKE A POST
router.put("/unlike/:postId", authMiddleware, unlikePost);

// GET ALL LIKES OF A POST
router.get("/like/:postId", authMiddleware, getAllLikePost);

// CREATE A COMMENT
router.post("/comment/:postId", authMiddleware, createComment);

// DELETE A COMMENT
router.delete("/:postId/:commentId", authMiddleware, deleteComment);

module.exports = router;
