import React, { useState } from "react";
import { Feed, Button, Divider } from "semantic-ui-react";
import calculateTime from "../../utils/calculateTime";
import { followUser, unfollowUser } from "../../utils/profileActions";

function FollowerNotification({
  notification,
  loggedUserFollowStats,
  setUserFollowStats,
}) {
  const [disabled, setDisabled] = useState(false);

  const isFollowing =
    loggedUserFollowStats.following.length > 0 &&
    loggedUserFollowStats.following.filter(
      (following) => following.user === notification.user._id
    ).length > 0;

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
        <Feed.Content style={{ position: "relative" }}>
          <Feed.Summary>
            <>
              <Feed.User as="a" href={`/${notification.user.username}`}>
                {notification.user.name}
              </Feed.User>{" "}
              đã bắt đầu theo bạn.
              <Feed.Date>{calculateTime(notification.date)}</Feed.Date>
            </>
          </Feed.Summary>

          <div style={{ position: "absolute", right: "5px", top: "0" }}>
            <Button
              size="small"
              compact
              icon={isFollowing ? "check circle" : "add user"}
              color={isFollowing ? "instagram" : "twitter"}
              disabled={disabled}
              onClick={async () => {
                setDisabled(true);

                isFollowing
                  ? await unfollowUser(
                      notification.user._id,
                      setUserFollowStats
                    )
                  : await followUser(notification.user._id, setUserFollowStats);

                setDisabled(false);
              }}
            />
          </div>
        </Feed.Content>
      </Feed.Event>
      <Divider />
    </>
  );
}

export default FollowerNotification;
