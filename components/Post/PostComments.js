import React, { useState } from "react";
import { Comment, Icon } from "semantic-ui-react";
import calculateTime from "../../utils/calculateTime";
import { deleteComment } from "../../utils/postActions";

function PostComments({ comment, user, setComments, postId }) {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Comment.Group>
        <Comment>
          <Comment.Avatar
            src={comment.user.profilePicUrl}
            style={{ width: "2.5rem", height: "2.5rem" }}
          />
          <Comment.Content
            style={{
              backgroundColor: "#F0F2F5",
              color: "#050505",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            <Comment.Author as="a" href={`/${comment.user.username}`}>
              {comment.user.name}
            </Comment.Author>
            <Comment.Metadata>{calculateTime(comment.date)}</Comment.Metadata>

            <Comment.Text
              style={{
                fontSize: "0.8em",
              }}
            >
              {comment.text}
            </Comment.Text>

            <Comment.Actions
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <Comment.Action>
                {(user.role === "root" || comment.user._id === user._id) && (
                  <Icon
                    disabled={disabled}
                    color="red"
                    name="trash"
                    onClick={async () => {
                      setDisabled(true);
                      await deleteComment(postId, comment._id, setComments);
                      setDisabled(false);
                    }}
                  />
                )}
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </>
  );
}

export default PostComments;
