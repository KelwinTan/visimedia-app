import { Button, Form, message, Select } from "antd";
import { useEffect } from "react";
import { useBestProduct } from "../../../context/best-product-context";
import { useProduct } from "../../../context/product-context";
import transformError from "../../../shared/transformError";

export default function BestProductForm({ onClose }) {
  const { products, getAll: getAllProducts } = useProduct();
  const { create, loading } = useBestProduct();
  const [form] = Form.useForm();

  useEffect(() => {
    getAllProducts();
  }, []);

  const onAdd = async ({ product_id }) => {
    try {
      await create({ product_id });
      message.success("Success add a new category");
      onClose();
    } catch (error) {
      const errorResponse = transformError(error);
      if (errorResponse) message.error("Error: " + errorResponse);
    }
  };

  const onFinish = ({ product_id }) => {
    onAdd({ product_id });
  };

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Product Name"
        name="product_id"
        rules={[{ required: true, message: "Please select product" }]}
      >
        <Select>
          {products.map((d) => (
            <Select.Option value={d.id}>{d.name}</Select.Option>
          ))}
        </Select>
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
