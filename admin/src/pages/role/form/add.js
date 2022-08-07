import { Button, Form, Input } from "antd";
import useRole from "../../../hooks/api/useRole";

export default function RoleForm({ id }) {
  const { loading } = useRole();

  const onAdd = async ({ name }) => {};

  const onUpdate = async ({ name }) => {};

  const onFinish = ({ name }) => {
    if (id) {
      onUpdate({ name });
    } else {
      onAdd({ name });
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{}}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          style={{ width: "100%" }}
          loading={loading}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
