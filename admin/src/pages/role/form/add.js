import { Button, Form, Input, message } from "antd";
import useRole from "../../../hooks/api/useRole";

export default function RoleForm({ onClose }) {
  const { loading, create } = useRole();

  const onAdd = async ({ name }) => {
    try {
      await create({ name });
      message.success("Success create a new role");
      onClose();
    } catch (error) {
      message.error("Error: " + error);
    }
  };

  const onFinish = ({ name }) => {
    onAdd({ name });
  };

  return (
    <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
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
