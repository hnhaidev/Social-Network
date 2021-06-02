import React from "react";
import { Menu } from "semantic-ui-react";
import { createMedia } from "@artsy/fresnel";

// Tạo tỉ lệ để responsive
const AppMedia = createMedia({
  breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 },
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

function ProfileMenuTabs({
  activeItem,
  handleItemClick,
  followersLength,
  followingLength,
  ownAccount,
  loggedUserFollowStats,
}) {
  return (
    <>
      <style>{mediaStyles}</style>

      <Media greaterThanOrEqual="mobile">
        <Menu pointing secondary>
          <Menu.Item
            active={activeItem === "profile"}
            onClick={() => handleItemClick("profile")}
          >
            Trang cá nhân
          </Menu.Item>

          <Menu.Item
            active={activeItem === "followers"}
            onClick={() => handleItemClick("followers")}
          >
            {followersLength} theo dõi
          </Menu.Item>

          {ownAccount ? (
            <>
              <Menu.Item
                active={activeItem === "following"}
                onClick={() => handleItemClick("following")}
              >
                Đang theo dõi{" "}
                {loggedUserFollowStats.following.length > 0
                  ? loggedUserFollowStats.following.length
                  : 0}
              </Menu.Item>

              <Menu.Item
                active={activeItem === "updateProfile"}
                onClick={() => handleItemClick("updateProfile")}
              >
                Cập nhật
              </Menu.Item>

              <Menu.Item
                active={activeItem === "settings"}
                onClick={() => handleItemClick("settings")}
              >
                Cài đặt
              </Menu.Item>
            </>
          ) : (
            <Menu.Item
              active={activeItem === "following"}
              onClick={() => handleItemClick("following")}
            >
              Đang theo dõi {followingLength}
            </Menu.Item>
          )}
        </Menu>
      </Media>

      <Media between={["zero", "mobile"]}>
        <Menu pointing secondary>
          <Menu.Item
            active={activeItem === "profile"}
            onClick={() => handleItemClick("profile")}
          >
            Trang cá nhân
          </Menu.Item>

          <Menu.Item
            active={activeItem === "followers"}
            onClick={() => handleItemClick("followers")}
          >
            {followersLength} theo dõi
          </Menu.Item>

          <Menu.Item
            active={activeItem === "following"}
            onClick={() => handleItemClick("following")}
          >
            Đang theo dõi{" "}
            {loggedUserFollowStats.following.length > 0
              ? loggedUserFollowStats.following.length
              : 0}
          </Menu.Item>
        </Menu>

        {ownAccount && (
          <>
            <Menu pointing secondary>
              <Menu.Item
                active={activeItem === "updateProfile"}
                onClick={() => handleItemClick("updateProfile")}
              >
                Cập nhật
              </Menu.Item>

              <Menu.Item
                active={activeItem === "settings"}
                onClick={() => handleItemClick("settings")}
              >
                Cài đặt
              </Menu.Item>
            </Menu>
          </>
        )}
      </Media>
    </>
  );
}

export default ProfileMenuTabs;
