import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useCategory } from "../../../context/category-context";
import { useVariant } from "../../../context/variant-context";

export default function VariantForm({ id, onClose }) {
  const { loading, create, getDetail, update } = useVariant();
  const { getAll } = useCategory();

  const [detail, setDetail] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    getAll();
  }, [getAll]);

  useEffect(() => {
    if (id) {
      getDetail(id).then((data) => {
        form.setFieldsValue({ name: data.variant });
      });
    } else {
      setDetail({});
    }
  }, [getDetail, id]);

  const onAdd = async ({ name }) => {
    try {
      await create({
        name,
      });
      message.success("Success add a new variant");
      onClose();
    } catch (error) {
      const errorResponse = error.response?.data?.errors || undefined;
      if (errorResponse) {
        const [_error] = Object.entries(errorResponse);
        message.error("Error: " + _error[1]);
      }
    }
  };

  const onUpdate = async ({ name }) => {
    try {
      await update({
        name,
      });
      message.success("Success add a new variant");
      onClose();
    } catch (error) {
      const errorResponse = error.response?.data?.errors || undefined;
      if (errorResponse) {
        const [_error] = Object.entries(errorResponse);
        message.error("Error: " + _error[1]);
      }
    }
  };

  const onFinish = ({ name }) => {
    if (id) {
      onUpdate({
        name,
      });
    } else {
      onAdd({
        name,
      });
    }
  };

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
