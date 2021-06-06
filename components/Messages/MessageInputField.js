import React, { useState } from "react";
import { Form, Segment, Icon } from "semantic-ui-react";

function MessageInputField({ sendMsg }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ position: "sticky", bottom: "0" }}>
      <Segment secondary color="teal" attached="bottom">
        <Form
          reply
          onSubmit={(e) => {
            e.preventDefault();
            sendMsg(text);
            setText("");
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
          />
        </Form>
      </Segment>
    </div>
  );
}

export default MessageInputField;
