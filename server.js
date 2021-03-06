const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });
const connectDb = require("./utilsServer/connectDb");
const PORT = process.env.PORT || 3000;
app.use(express.json()); // this is the body parser
connectDb();
const {
  addUser,
  removeUser,
  findConnectedUser,
} = require("./utilsServer/roomActions");
const {
  loadMessages,
  sendMsg,
  setMsgToUnread,
  deleteMsg,
} = require("./utilsServer/messageActions");
const { likeOrUnlikePost } = require("./utilsServer/likeOrUnlikePost");

// Để tiếp nhận và lắng nghe dữ liệu => socket.on(). Còn để phát dữ liệu => socket.emit().
io.on("connection", (socket) => {
  socket.on("join", async ({ userId }) => {
    const users = await addUser(userId, socket.id);
    console.log(users);

    // kiểm tra người dùng ol ... 5s
    setInterval(() => {
      socket.emit("connectedUsers", {
        users: users.filter((user) => user.userId !== userId),
      });
    }, 5000);
  });

  // tạo realtime khi like post
  socket.on("likePost", async ({ postId, userId, like }) => {
    const { success, name, profilePicUrl, username, postByUserId, error } =
      await likeOrUnlikePost(postId, userId, like);

    if (success) {
      socket.emit("postLiked");

      if (postByUserId !== userId) {
        const receiverSocket = findConnectedUser(postByUserId);

        if (receiverSocket && like) {
          // Gửi dữ liệu cho client cụ thể
          io.to(receiverSocket.socketId).emit("newNotificationReceived", {
            name,
            profilePicUrl,
            username,
            postId,
          });
        }
      }
    }
  });

  socket.on("loadMessages", async ({ userId, messagesWith }) => {
    const { chat, error } = await loadMessages(userId, messagesWith);

    !error
      ? socket.emit("messagesLoaded", { chat })
      : socket.emit("noChatFound");
  });

  socket.on("sendNewMsg", async ({ userId, msgSendToUserId, msg }) => {
    const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
    const receiverSocket = findConnectedUser(msgSendToUserId);

    if (receiverSocket) {
      // Gửi tin nhắn đến một nơi cụ thể
      io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
    }
    //
    else {
      await setMsgToUnread(msgSendToUserId);
    }

    !error && socket.emit("msgSent", { newMsg });
  });

  socket.on("deleteMsg", async ({ userId, messagesWith, messageId }) => {
    const { success } = await deleteMsg(userId, messagesWith, messageId);

    if (success) socket.emit("msgDeleted");
  });

  socket.on(
    "sendMsgFromNotification",
    async ({ userId, msgSendToUserId, msg }) => {
      const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
      const receiverSocket = findConnectedUser(msgSendToUserId);

      if (receiverSocket) {
        // Gửi tin nhắn đến một nơi cụ thể
        io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
      }
      //
      else {
        await setMsgToUnread(msgSendToUserId);
      }

      !error && socket.emit("msgSentFromNotification");
    }
  );

  socket.on("sendNewMsgGlobal", (data) => {
    io.sockets.emit("sendMsgGlobal", data);
  });

  socket.on("disconnect", () => removeUser(socket.id));
});

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/search", require("./api/search"));
  app.use("/api/posts", require("./api/posts"));
  app.use("/api/profile", require("./api/profile"));
  app.use("/api/notifications", require("./api/notifications"));
  app.use("/api/chats", require("./api/chats"));
  app.use("/api/suggested", require("./api/suggested"));
  app.use("/api/reset", require("./api/reset"));

  app.all("*", (req, res) => handle(req, res));
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Express sever running on ${PORT}`);
  });
});
