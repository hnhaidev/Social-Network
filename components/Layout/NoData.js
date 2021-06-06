import { Message, Button } from "semantic-ui-react";

export const NoProfilePosts = () => (
  <>
    <Message
      info
      icon="meh"
      header="Sorry"
      content="Người dùng đã không đăng bất cứ điều gì được nêu ra!"
    />
    <Button
      icon="long arrow alternate left"
      content="Quay lại"
      as="a"
      href="/"
    />
  </>
);

export const NoFollowData = ({ followersComponent, followingComponent }) => (
  <>
    {followersComponent && (
      <Message
        icon="user outline"
        info
        content="Người dùng không có người theo dõi "
      />
    )}

    {followingComponent && (
      <Message
        icon="user outline"
        info
        content="Người dùng không theo dõi bất kỳ người dùng nào"
      />
    )}
  </>
);

export const NoMessages = () => (
  <Message
    info
    icon="telegram plane"
    header="Sorry"
    content="Bạn chưa nhắn tin cho ai cả. Tìm kiếm ở trên để nhắn tin cho ai đó!"
  />
);

export const NoPosts = () => (
  <Message
    info
    icon="meh"
    header="Hey!"
    content="Không có bài đăng nào. Đảm bảo rằng bạn đã theo dõi ai đó."
  />
);

export const NoProfile = () => (
  <Message info icon="meh" header="Hey!" content="Không tìm thấy hồ sơ." />
);

export const NoNotifications = () => (
  <Message content="Không có thông báo nào !" icon="smile" info />
);

export const NoPostFound = () => (
  <Message info icon="meh" header="Hey!" content="Không tìm thấy bài đăng !" />
);
