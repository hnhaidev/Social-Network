import React, { useState } from "react";
import { Form, Icon } from "semantic-ui-react";
import { postComment } from "../../utils/postActions";
import { Picker } from "emoji-mart";

function CommentInputField({ postId, user, setComments }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicKer] = useState(false);

  const handleEmojiSelect = (e) => {
    setText((text) => (text += e.native));
  };

  return (
    <Form
      reply
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await postComment(postId, user, text, setComments, setText);

        setLoading(false);
        setShowPicKer(false);
      }}
    >
      <Form.Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Viết bình luận công khai ..."
        action={{
          color: "blue",
          icon: "edit",
          loading: loading,
          disabled: text.trim() === "" || loading,
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
  );
}

export default CommentInputField;
