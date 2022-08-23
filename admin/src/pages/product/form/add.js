import { Button, Form, Image, Input, message, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { useBanner } from "../../../context/banner-context";
import { useCategory } from "../../../context/category-context";
import { useProduct } from "../../../context/product-context";

export default function ProductForm({ id, onClose }) {
  const { loading, create } = useProduct();
  const { categories } = useCategory();

  const [detail, setDetail] = useState({});
  const [form] = Form.useForm();

  const onAdd = async ({ name, category_id, quantity, price }) => {
    try {
      await create({ name, category_id, quantity, price });
      message.success("Success add a new banner");
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
    onAdd({ name });
  };

  return (
    <Form
      form={form}
      defaultValue={detail}
      name="basic"
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

      <Form.Item
        label="Category"
        name="category_id"
        rules={[{ required: true, message: "Please input Category" }]}
      >
        <Select>
          {categories?.map((c, idx) => (
            <Select.Option key={idx} value={c.id}>
              {c.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: "Please input quantity" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input price" }]}
      >
        <Input type="number" />
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
