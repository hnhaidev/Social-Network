import React, { useState } from "react";
import { Form, Segment, Icon } from "semantic-ui-react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

function MessageInputField({ sendMsg }) {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [iconHien, setIconHien] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);

    if (chosenEmoji !== null) {
      sendMsg(chosenEmoji.emoji);
      setIconHien(false);
    }
  };
  const onSubmit = () => {
    sendMsg(text);
    setText("");
    setIconHien(false);
  };

  return (
    <div style={{ position: "sticky", bottom: "0" }}>
      <Segment secondary color="teal" attached="bottom">
        <Form reply onSubmit={onSubmit}>
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
          <Icon
            name="meh outline"
            size="small"
            style={{
              position: "absolute",
              top: "50%",
              fontSize: "1.5em",
              color: "teal",
              right: "2em",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={() => {
              setIconHien(!iconHien);
            }}
          />
          {iconHien && (
            <div
              style={{
                textAlign: "center",
                position: "absolute",
                bottom: "3rem",
                right: "3rem",
              }}
            >
              <Picker
                onEmojiClick={onEmojiClick}
                skinTone={SKIN_TONE_MEDIUM_DARK}
                groupVisibility={{
                  recently_used: false,
                }}
              />
              {/* {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />} */}
            </div>
          )}
        </Form>
      </Segment>
    </div>
  );
}

export default MessageInputField;
