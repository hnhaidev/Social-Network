import React from "react";
import { Divider, Comment, Icon, List, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import calculateTime from "../../utils/calculateTime";

function Chat({ chat, connectedUsers, deleteChat }) {
  const router = useRouter();

  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === chat.messagesWith).length >
      0;

  return (
    <>
      <List selection>
        <List.Item
          active={router.query.message === chat.messagesWith}
          onClick={() =>
            router.push(`/messages?message=${chat.messagesWith}`, undefined, {
              shallow: true,
            })
          }
        >
          <Comment>
            <Image
              avatar
              src={chat.profilePicUrl}
              style={{ borderRadius: "50%", width: "2.5em", height: "2.5em" }}
            />
            <Comment.Content>
              <Comment.Author as="a">
                {chat.name}{" "}
                {isOnline && <Icon name="circle" size="small" color="green" />}
              </Comment.Author>

              <Comment.Metadata>
                <div>{calculateTime(chat.date)}</div>
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    cursor: "pointer",
                    top: "0",
                  }}
                >
                  <Icon
                    name="trash alternate"
                    color="red"
                    onClick={() => deleteChat(chat.messagesWith)}
                  />
                </div>
              </Comment.Metadata>

              <Comment.Text>
                {chat.lastMessage.length > 20
                  ? `${chat.lastMessage.substring(0, 20)} ...`
                  : chat.lastMessage}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        </List.Item>
      </List>
      <Divider />
    </>
  );
}

export default Chat;
