import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import useOrderStatus from "src/hooks/api/useOrderStatus";
import transformError from "../../../shared/transformError";

export default function OrderStatusForm({ data, onClose }) {
  const { loading, create, orderStatus, update } = useOrderStatus();
  const [form] = Form.useForm();

  const onAdd = async (values) => {
    try {
      await create(values);
      message.success("Success add a new category");
      onClose();
    } catch (error) {
      const errorResponse = transformError(error);
      message.error("Error: " + errorResponse);
    }
  };

  const onUpdate = async (id, values) => {
    try {
      await update(id, values);
      message.success("Success update a new category");
      onClose();
    } catch (error) {
      const errorResponse = transformError(error);
      message.error("Error: " + errorResponse);
    }
  };

  const onFinish = (values) => {
    if (data) {
      onUpdate(data.id, values);
    } else {
      onAdd(values);
    }
  };

  useEffect(() => {
    console.log({ data });
    if (data) {
      form.setFieldsValue({ status: data.status, priority: data.priority });
    } else {
      form.setFieldsValue({});
    }
  }, [data, form, orderStatus]);

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please input status" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Priority"
        name="priority"
        rules={[{ required: true, message: "Please input priority" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          loading={loading}
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
