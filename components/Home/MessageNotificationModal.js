import React, { useState } from "react";
import { Form, Modal, Segment, List, Icon } from "semantic-ui-react";
import Link from "next/link";
import calculateTime from "../../utils/calculateTime";

function MessageNotificationModal({
  socket,
  showNewMessageModal,
  newMessageModal,
  newMessageReceived,
  user,
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const onModalClose = () => showNewMessageModal(false);

  const formSubmit = (e) => {
    e.preventDefault();

    if (socket.current) {
      socket.current.emit("sendMsgFromNotification", {
        userId: user._id,
        msgSendToUserId: newMessageReceived.sender,
        msg: text,
      });

      socket.current.on("msgSentFromNotification", () => {
        showNewMessageModal(false);
      });
    }
  };

  return (
    <>
      <Modal
        size="small"
        open={newMessageModal}
        onClose={onModalClose}
        closeIcon
        closeOnDimmerClick
      >
        <Modal.Header
          content={`Tin nhắn mới từ ${newMessageReceived.senderName}`}
        />

        <Modal.Content>
          <div className="bubbleWrapper">
            <div className="inlineContainer">
              <img
                className="inlineIcon"
                src={newMessageReceived.senderProfilePic}
              />
            </div>

            <div className="otherBubble other">{newMessageReceived.msg}</div>

            <span className="other">
              {calculateTime(newMessageReceived.date)}
            </span>
          </div>

          <div style={{ position: "sticky", bottom: "0px" }}>
            <Segment secondary color="teal" attached="bottom">
              <Form reply onSubmit={formSubmit}>
                <Form.Input
                  size="large"
                  placeholder="Gửi tin nhắn mới..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  action={{
                    color: "blue",
                    icon: "telegram plane",
                    disabled: text === "",
                    loading: loading,
                  }}
                />
              </Form>
            </Segment>
          </div>

          <div style={{ marginTop: "5px" }}>
            <Link href={`/messages?message=${newMessageReceived.sender}`}>
              <a>Xem tất cả tin nhắn</a>
            </Link>

            <br />

            <Instructions username={user.username} />
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}

const Instructions = ({ username }) => (
  <List>
    <List.Item>
      <Icon name="help" />
      <List.Content>
        <List.Header>
          {" "}
          Nếu bạn không muốn cửa sổ bật lên này xuất hiện khi bạn nhận được tin
          nhắn mới:
        </List.Header>
      </List.Content>
    </List.Item>

    <List.Item>
      <Icon name="hand point right" />
      <List.Content>
        {" "}
        Bạn có thể tắt nó bằng cách đi tới
        <Link href={`/${username}`}>
          <a> Tài khoản </a>
        </Link>
        Và nhấp vào Tab Cài đặt.
      </List.Content>
    </List.Item>

    <List.Item>
      <Icon name="hand point right" /> Bên trong menu, có một cài đặt có tên:
      Hiển thị cửa sổ bật lên tin nhắn mới?
    </List.Item>

    <List.Item>
      <Icon name="hand point right" /> Chỉ cần chuyển đổi cài đặt để tắt / bật
      thông báo bật lên xuất hiện.
    </List.Item>
  </List>
);

export default MessageNotificationModal;
