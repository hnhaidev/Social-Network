import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import { Segment } from "semantic-ui-react";
import MessageInputField from "../components/Messages/MessageInputField";
import baseUrl from "../utils/baseUrl";

const scrollDivToBottom = (divRef) =>
  divRef.current !== null &&
  divRef.current.scrollIntoView({ behaviour: "smooth" });

function Messagesglobal(user) {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const divRef = useRef();

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.on("sendMsgGlobal", (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }
  }, []);

  useEffect(() => {
    messages.length > 0 && scrollDivToBottom(divRef);
  }, [messages]);

  const sendMsg = (msg) => {
    if (socket.current) {
      socket.current.emit("sendNewMsgGlobal", {
        user,
        msg,
      });
    }
  };
  return (
    <>
      <Segment
        content="Kênh thế giới"
        style={{
          marginBottom: "0",
          marginTop: "1rem",
          color: "teal",
          fontSize: "1em",
          fontWeight: "700",
          textAlign: "center",
        }}
      />
      <Segment
        style={{
          marginTop: "0",
          height: "35rem",
          maxHeight: "35rem",
          overflow: "auto",
          marginBottom: "0",
        }}
      >
        {messages.length > 0 &&
          messages.map((message, i) => (
            <div className="bubbleWrapper" key={i} ref={divRef}>
              <div
                className={
                  message.user.user._id === user.user._id
                    ? "inlineContainer own"
                    : "inlineContainer"
                }
              >
                <img
                  className="inlineIcon"
                  src={message.user.user.profilePicUrl}
                />
                <div
                  className={
                    message.user.user._id === user.user._id
                      ? "ownBubble own"
                      : "otherBubble other"
                  }
                >
                  {message.msg}
                </div>
              </div>
            </div>
          ))}
      </Segment>
      <MessageInputField
        sendMsg={sendMsg}
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          left: "0",
        }}
      />
    </>
  );
}

export default Messagesglobal;
