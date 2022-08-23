import { Button, Form, Input, message } from "antd";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VISIMEDIA_LOGO } from "../../../assets/image";
import { useAuth } from "../../../context/auth-context";
import { styContainer, styLogo } from "./styles";

function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onFinish = useCallback(
    (values) => {
      login(values)
        .then(() => {
          const u = new URLSearchParams(location.search);
          const redirectURL = u.get("ld") || "/";
          navigate({ pathname: redirectURL });
        })
        .catch((err) => {
          const error = err.response?.data?.error || err || "";
          message.error(error);
        });
    },
    [location.search, login, navigate]
  );

  return (
    <div className={styContainer}>
      <img className={styLogo} src={VISIMEDIA_LOGO} alt="logo" />
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ width: "100%" }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          style={{ width: "100%" }}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
