import React from "react";
import { Menu, Container, Icon, Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { logoutUser } from "../../utils/authUser";

function MobileHeader({
  user: { unreadNotification, email, unreadMessage, username },
}) {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;

  return (
    <>
      <Menu fluid borderless>
        <Container text>
          <Link href="/">
            <Menu.Item header active={isActive("/")}>
              <Icon name="home" size="large" color="teal" />
            </Menu.Item>
          </Link>

          <Link href="/messages">
            <Menu.Item
              header
              active={isActive("/messages") || unreadMessage}
              as="a"
              href="/messages"
            >
              <Icon
                name={unreadMessage ? "mail" : "mail outline"}
                size="large"
                color="teal"
              />
            </Menu.Item>
          </Link>

          <Link href="/notifications">
            <Menu.Item
              header
              active={isActive("/notifications") || unreadNotification}
            >
              <Icon
                name={unreadNotification ? "bell" : "bell outline"}
                size="large"
                color="teal"
              />
            </Menu.Item>
          </Link>

          <Dropdown item icon="bars" direction="left" style={{ color: "teal" }}>
            <Dropdown.Menu>
              <Link href={`/${username}`}>
                <Dropdown.Item active={isActive(`/${username}`)}>
                  <Icon name="user" size="large" color="teal" />
                  Tài khoản
                </Dropdown.Item>
              </Link>

              <Link href="/search">
                <Dropdown.Item active={isActive("/search")}>
                  <Icon name="search" size="large" color="teal" />
                  Tìm kiếm
                </Dropdown.Item>
              </Link>

              <Dropdown.Item onClick={() => logoutUser(email)}>
                <Icon name="sign out alternate" size="large" color="teal" />
                Đăng xuất
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    </>
  );
}

export default MobileHeader;
