const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");
const NotificationModel = require("../models/NotificationModel");
const ChatModel = require("../models/ChatModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

module.exports.auth = async (req, res) => {
  const { userId } = req;

  try {
    const user = await UserModel.findById(userId);

    const userFollowStats = await FollowerModel.findOne({ user: userId });

    return res.status(200).json({ user, userFollowStats });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};

module.exports.postAuth = async (req, res) => {
  const { email, password } = req.body.user;

  if (!isEmail(email)) return res.status(401).send("Email không hợp lệ !");

  if (password.length < 6) {
    return res.status(401).send("Mật khẩu phải ít nhất 6 kí tự !");
  }

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).send("Tài khoản hoặc mật khẩu không đúng !");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).send("Tài khoản hoặc mật khẩu không đúng !");
    }

    const notificationModel = await NotificationModel.findOne({
      user: user._id,
    });
    if (!notificationModel) {
      await new NotificationModel({ user: user._id, notifications: [] }).save();
    }

    const chatModel = await ChatModel.findOne({
      user: user._id,
    });
    if (!chatModel) {
      await new ChatModel({ user: user._id, chats: [] }).save();
    }

    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Lỗi Server !`);
  }
};
