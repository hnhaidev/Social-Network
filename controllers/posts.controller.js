const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const uuid = require("uuid").v4;
const {
  newLikeNotification,
  removeLikeNotification,
  newCommentNotification,
  removeCommentNotification,
} = require("../utilsServer/notificationActions");

// tạo bài viết
module.exports.createPost = async (req, res) => {
  const { text, location, picUrl } = req.body;

  if (text.length < 1)
    return res.status(401).send("Văn bản phải có ít nhất 1 ký tự !");

  try {
    const newPost = {
      user: req.userId,
      text,
    };
    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;

    const post = await new PostModel(newPost).save();

    const postCreated = await PostModel.findById(post._id).populate("user");

    return res.json(postCreated);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};

// lấy ra tất cả các bài viết
module.exports.getPost = async (req, res) => {
  const { pageNumber } = req.query;

  try {
    const number = Number(pageNumber);
    const size = 8;
    const { userId } = req;

    const loggedUser = await FollowerModel.findOne({ user: userId }).select(
      "-followers"
    );

    let posts = [];

    if (number === 1) {
      if (loggedUser.following.length > 0) {
        posts = await PostModel.find({
          user: {
            $in: [
              userId,
              ...loggedUser.following.map((following) => following.user),
            ],
          },
        })
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      }
      //
      else {
        posts = await PostModel.find({ user: userId })
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      }
    }

    //
    else {
      const skips = size * (number - 1);

      if (loggedUser.following.length > 0) {
        posts = await PostModel.find({
          user: {
            $in: [
              userId,
              ...loggedUser.following.map((following) => following.user),
            ],
          },
        })
          .skip(skips)
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      }
      //
      else {
        posts = await PostModel.find({ user: userId })
          .skip(skips)
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      }
    }

    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};

// lấy ra bài viết theo id
module.exports.getPostById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId)
      .populate("user")
      .populate("comments.user");

    if (!post) {
      return res.status(404).send("Không tìm thấy bài viết !");
    }

    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};

// xóa bài viết
module.exports.deletePost = async (req, res) => {
  try {
    const { userId } = req;

    const { postId } = req.params;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("Không tìm thấy bài viết !");
    }

    const user = await UserModel.findById(userId);

    if (post.user.toString() !== userId) {
      if (user.role === "root") {
        await post.remove();
        return res.status(200).send("Đã xóa bài viết thành công !");
      } else {
        return res.status(401).send("Unauthorized");
      }
    }

    await post.remove();
    return res.status(200).send("Đã xóa bài viết thành công !");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};

// like bài viết
module.exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("Không tìm thấy bài viết !");
    }

    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length > 0;

    if (isLiked) {
      return res.status(401).send("Bài viết đã được thích !");
    }

    await post.likes.unshift({ user: userId });
    await post.save();

    if (post.user.toString() !== userId) {
      await newLikeNotification(userId, postId, post.user.toString());
    }

    return res.status(200).send("Đã thích bài viết !");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};

// UNLIKE bài viết
module.exports.unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("Không tìm thấy bài viết !");
    }

    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length === 0;

    if (isLiked) {
      return res.status(401).send("Bài viết này không thích trước đây !");
    }

    const index = post.likes
      .map((like) => like.user.toString())
      .indexOf(userId);

    await post.likes.splice(index, 1);

    await post.save();

    if (post.user.toString() !== userId) {
      await removeLikeNotification(userId, postId, post.user.toString());
    }

    return res.status(200).send("Không thích bài viết !");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};

// lấy ra tất cả các like của một bài viết
module.exports.getAllLikePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await PostModel.findById(postId).populate("likes.user");
    if (!post) {
      return res.status(404).send("Không tìm thấy bài viết !");
    }

    return res.status(200).json(post.likes);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};

// tạo cmt
module.exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const { text } = req.body;
    const { userId } = req;

    if (text.length < 1)
      return res.status(401).send("Nhận xét chỉ nên có ít nhất 1 ký tự !");

    const post = await PostModel.findById(postId);

    if (!post) return res.status(404).send("Không tìm thấy bài viết");

    const newComment = {
      _id: uuid(),
      text,
      user: userId,
      date: Date.now(),
    };

    await post.comments.unshift(newComment);
    await post.save();

    if (post.user.toString() !== userId) {
      await newCommentNotification(
        postId,
        newComment._id,
        userId,
        post.user.toString(),
        text
      );
    }

    return res.status(200).json(newComment._id);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};

// xóa cmt
module.exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("Không tìm thấy bài viết !");

    const comment = post.comments.find((comment) => comment._id === commentId);
    if (!comment) {
      return res.status(404).send("Không tìm thấy bình luận !");
    }

    const user = await UserModel.findById(userId);

    const deleteComment = async () => {
      const indexOf = post.comments
        .map((comment) => comment._id)
        .indexOf(commentId);

      await post.comments.splice(indexOf, 1);

      await post.save();

      if (post.user.toString() !== userId) {
        await removeCommentNotification(
          postId,
          commentId,
          userId,
          post.user.toString()
        );
      }

      return res.status(200).send("Đã xoá thành công !");
    };

    if (comment.user.toString() !== userId) {
      if (user.role === "root") {
        await deleteComment();
      } else {
        return res.status(401).send("Unauthorized");
      }
    }

    await deleteComment();
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};
