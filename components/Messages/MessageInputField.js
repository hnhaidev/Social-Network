import React, { useState } from "react";
import { Form, Segment, Icon } from "semantic-ui-react";
import { Picker } from "emoji-mart";

function MessageInputField({ sendMsg }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicKer] = useState(false);

  const handleEmojiSelect = (e) => {
    setText((text) => (text += e.native));
  };

  return (
    <div style={{ position: "sticky", bottom: "0" }}>
      <Segment secondary color="teal" attached="bottom">
        <Form
          reply
          onSubmit={(e) => {
            e.preventDefault();
            if (text.trim().length > 0) {
              sendMsg(text);
              setText("");
              setShowPicKer(false);
            }
          }}
        >
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
            onClick={() => setShowPicKer(!showPicker)}
          />
          {showPicker && (
            <Picker
              onSelect={handleEmojiSelect}
              emojiSize={20}
              style={{ position: "absolute", right: "2.5rem", bottom: "3rem" }}
            />
          )}
        </Form>
      </Segment>
    </div>
  );
}

export default MessageInputField;
