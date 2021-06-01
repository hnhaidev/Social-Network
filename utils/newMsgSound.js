const newMsgSound = (senderName) => {
  const sound = new Audio("/light.mp3");

  sound && sound.play();

  if (senderName) {
    document.title = `Có tin nhắn mới từ ${senderName}`;

    if (document.visibilityState === "visible") {
      setTimeout(() => {
        document.title = "Tin nhắn";
      }, 5000);
    }
  }
};

export default newMsgSound;
