import { Icon, Message, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const HeaderMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <Message
      color="teal"
      attached
      size="big"
      header={signupRoute ? "Đăng Ký" : "Đăng Nhập"}
      // icon={signupRoute ? "add user" : "user circle outline"}
      // content={signupRoute ? "Tạo tài khoản mới" : "Đăng nhập bằng Email"}
      style={{ textAlign: "center" }}
    />
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <>
      {signupRoute ? (
        <>
          <Message attached="bottom" warning>
            <Icon name="help" />
            Đã có tài khoản ? <Link href="/login">Đăng nhập</Link> tại đây{" "}
          </Message>
          <Divider hidden />
        </>
      ) : (
        <>
          <Message attached="bottom" warning>
            <Icon name="lock" />
            <Link href="/reset">Quên mật khẩu ?</Link>
          </Message>
          <Message attached="bottom" warning>
            <Icon name="help" />
            Chưa có tài khoản ? <Link href="/signup">Đăng ký</Link> tại đây{" "}
          </Message>
        </>
      )}
    </>
  );
};
