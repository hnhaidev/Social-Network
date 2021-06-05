const ChatModel = require("../models/ChatModel");
const UserModel = require("../models/UserModel");

// GET ALL CHATS
module.exports.getChats = async (req, res) => {
  try {
    const { userId } = req;

    const user = await ChatModel.findOne({ user: userId }).populate(
      "chats.messagesWith"
    );

    let chatsToBeSent = [];

    if (user.chats.length > 0) {
      chatsToBeSent = await user.chats.map((chat) => ({
        messagesWith: chat.messagesWith._id,
        name: chat.messagesWith.name,
        profilePicUrl: chat.messagesWith.profilePicUrl,
        lastMessage: chat.messages[chat.messages.length - 1].msg,
        date: chat.messages[chat.messages.length - 1].date,
      }));
    }

    return res.json(
      chatsToBeSent.sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi Server !");
  }
};

// GET USER INFO
module.exports.getUserInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userToFindId);

    if (!user) {
      return res.status(404).send("Không tìm thấy người dùng !");
    }

    return res.json({ name: user.name, profilePicUrl: user.profilePicUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi Server !");
  }
};

// Delete a chat
module.exports.deleteChat = async (req, res) => {
  try {
    const { userId } = req;
    const { messagesWith } = req.params;

    const user = await ChatModel.findOne({ user: userId });

    const chatToDelete = user.chats.find(
      (chat) => chat.messagesWith.toString() === messagesWith
    );

    if (!chatToDelete) {
      return res.status(404).send("Không tìm thấy cuộc trò chuyện !");
    }

    const indexOf = user.chats
      .map((chat) => chat.messagesWith.toString())
      .indexOf(messagesWith);

    user.chats.splice(indexOf, 1);

    await user.save();

    return res.status(200).send("Đã xóa tin nhắn !");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi Server !");
  }
};
