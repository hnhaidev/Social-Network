import React, { useState, useEffect } from "react";
import { Image, List, Divider } from "semantic-ui-react";
import Spinner from "../Layout/Spinner";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";

function Suggested() {
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFollowing = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/api/suggested`, {
          headers: { Authorization: cookie.get("token") },
        });

        setSuggested(res.data);
      } catch (error) {
        alert("Lỗi khi tải người theo dõi !");
      }
      setLoading(false);
    };

    getFollowing();
  }, []);
  return (
    <>
      <Divider />
      <List.Header content="Gợi ý cho bạn" />
      {loading ? (
        <Spinner />
      ) : (
        suggested.length > 0 &&
        suggested.map(
          (user, i) =>
            i < 10 && (
              <List key={user._id} divided verticalAlign="middle">
                <List.Item>
                  <Image avatar src={user.profilePicUrl} />
                  <List.Content as="a" href={`/${user.username}`}>
                    {user.name}
                  </List.Content>
                </List.Item>
              </List>
            )
        )
      )}
    </>
  );
}

export default Suggested;
