import { Button, Form, Image, Input, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useBanner } from "../../../context/banner-context";
import { useCategory } from "../../../context/category-context";

export default function CategoryForm({ id, onClose }) {
  const { loading, create, update, getDetail } = useCategory();
  const [detail, setDetail] = useState({});
  const [form] = Form.useForm();

  const onAdd = async ({ name, description }) => {
    try {
      await create({ name, description });
      message.success("Success add a new category");
      onClose();
    } catch (error) {
      const errorResponse = error.response?.data?.errors || undefined;
      if (errorResponse) {
        const [_error] = Object.entries(errorResponse);
        message.error("Error: " + _error[1]);
      }
    }
  };

  const onFinish = ({ name, description }) => {
    onAdd({ name, description });
  };

  useEffect(() => {
    if (id) {
      getDetail(id).then((data) => {
        form.setFieldsValue({ name: data.name, description: data.description });
      });
    } else {
      setDetail({});
    }
  }, [getDetail, id]);

  return (
    <Form
      form={form}
      defaultValue={detail}
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input description" }]}
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
