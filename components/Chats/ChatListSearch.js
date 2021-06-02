import React, { useState } from "react";
import { List, Image, Search } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import baseUrl from "../../utils/baseUrl";
let cancel;

function ChatListSearch({ chats, setChats }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleChange = async (e) => {
    const { value } = e.target;
    setText(value);

    if (value.length === 0) return;
    if (value.trim().length === 0) return;

    setLoading(true);

    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const token = cookie.get("token");

      const res = await axios.get(`${baseUrl}/api/search/${value}`, {
        headers: { Authorization: token },
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      });

      if (res.data.length === 0) return setLoading(false);

      setResults(res.data);
    } catch (error) {
      alert("Lỗi khi đang tìm kiếm !");
    }
    setLoading(false);
  };

  const addChat = (result) => {
    setText("");
    const alreadyInChat =
      chats.length > 0 &&
      chats.filter((chat) => chat.messagesWith === result._id).length > 0;

    if (alreadyInChat) {
      return router.push(`/messages?message=${result._id}`);
    }
    //
    else {
      const newChat = {
        messagesWith: result._id,
        name: result.name,
        profilePicUrl: result.profilePicUrl,
        lastMessage: "",
        date: Date.now(),
      };

      setChats((prev) => [newChat, ...prev]);

      return router.push(`/messages?message=${result._id}`);
    }
  };

  return (
    <Search
      onBlur={() => {
        results.length > 0 && setResults([]);
        loading && setLoading(false);
        setText("");
      }}
      loading={loading}
      value={text}
      resultRenderer={ResultRenderer}
      results={results}
      onSearchChange={handleChange}
      minCharacters={1}
      onResultSelect={(e, data) => addChat(data.result)}
    />
  );
}

const ResultRenderer = ({ _id, profilePicUrl, name }) => {
  return (
    <List>
      <List.Item
        key={_id}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          avatar
          src={profilePicUrl}
          style={{ borderRadius: "50%", width: "2.5em", height: "2.5em" }}
        />
        <a style={{ fontSize: "1.1em", fontWeight: "600", marginLeft: "1em" }}>
          {name}
        </a>
      </List.Item>
    </List>
  );
};

export default ChatListSearch;
