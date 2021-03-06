import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const router = useRouter();

  // kiem tra route : tra ve boolean
  const isActive = (route) => router.pathname === route;

  return (
    <Menu fluid borderless>
      <Container text>
        <Link href="/login">
          <Menu.Item header active={isActive("/login")}>
            <Icon size="large" name="sign in" />
            Đăng nhập
          </Menu.Item>
        </Link>

        <Link href="/signup">
          <Menu.Item header active={isActive("/signup")}>
            <Icon size="large" name="signup" />
            Đăng ký
          </Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
}

export default Navbar;
