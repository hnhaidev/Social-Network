const NotificationModel = require("../models/NotificationModel");
const UserModel = require("../models/UserModel");

module.exports.getNotification = async (req, res) => {
  try {
    const { userId } = req;

    const user = await NotificationModel.findOne({ user: userId })
      .populate("notifications.user")
      .populate("notifications.post");

    return res.json(user.notifications);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi Server !");
  }
};

module.exports.postNotification = async (req, res) => {
  try {
    const { userId } = req;

    const user = await UserModel.findById(userId);

    if (user.unreadNotification) {
      user.unreadNotification = false;
      await user.save();
    }
    return res.status(200).send("Đã cập nhật !");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi Server !");
  }
};
