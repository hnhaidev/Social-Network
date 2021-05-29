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

// GET PROFILE INFO
router.get("/:username", authMiddleware, getProfile);

// GET POSTS OF USER
router.get(`/posts/:username`, authMiddleware, getPostOfUser);

// GET FOLLOWERS OF USER
router.get("/followers/:userId", authMiddleware, getFollowersOfUser);

// GET FOLLOWING OF USER
router.get("/following/:userId", authMiddleware, getFollowingOfUser);

// FOLLOW A USER
router.post("/follow/:userToFollowId", authMiddleware, postFollowAUser);

// UNFOLLOW A USER
router.put("/unfollow/:userToUnfollowId", authMiddleware, putFollowAUser);

// UPDATE PROFILE
router.post("/update", authMiddleware, postUpdateProfile);

// UPDATE PASSWORD
router.post("/settings/password", authMiddleware, postUpdatePassword);

// UPDATE MESSAGE POPUP SETTINGS
router.post("/settings/messagePopup", authMiddleware, postUpdateMessagePopup);

module.exports = router;
