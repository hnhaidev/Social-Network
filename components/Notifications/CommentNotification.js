import React from "react";
import { Divider, Feed } from "semantic-ui-react";
import calculateTime from "../../utils/calculateTime";

function CommentNotification({ notification }) {
  return (
    <>
      <Feed.Event>
        <Feed.Label
          image={notification.user.profilePicUrl}
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
          }}
        />
        <Feed.Content>
          <Feed.Summary>
            <>
              <Feed.User as="a" href={`/${notification.user.username}`}>
                {notification.user.name}
              </Feed.User>{" "}
              đã bình luận trong{" "}
              <a href={`/post/${notification.post._id}`}>bài viết.</a>
              <Feed.Date>{calculateTime(notification.date)}</Feed.Date>
            </>
          </Feed.Summary>

          {notification.post.picUrl && (
            <Feed.Extra images>
              <a href={`/post/${notification.post._id}`}>
                <img src={notification.post.picUrl} />
              </a>
            </Feed.Extra>
          )}
          <Feed.Extra text>
            <strong>{notification.text}</strong>
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
      <Divider />
    </>
  );
}

export default CommentNotification;
