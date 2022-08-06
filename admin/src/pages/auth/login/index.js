import { Button, Form, Input, message } from "antd";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";

function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onFinish = useCallback((values) => {
    login(values)
      .then(() => {
        const u = new URLSearchParams(location.search);
        const redirectURL = u.get("ld") || "/";
        navigate({ pathname: redirectURL });
      })
      .catch((err) => {
        message.error(err + "");
      });
  }, []);

  return (
    <div style={{ width: 500 }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
