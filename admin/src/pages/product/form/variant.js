import { Button, Form, Image, Input, message, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useBanner } from "../../../context/banner-context";
import { useCategory } from "../../../context/category-context";
import { useProduct } from "../../../context/product-context";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useVariant } from "../../../context/variant-context";

export default function ProductForm({ id, onClose }) {
  const { products } = useProduct();
  const { variants, getAll, createWithDetails } = useVariant();

  const [detail, setDetail] = useState({});
  const imageRef = useRef(null);
  const [form] = Form.useForm();

  const onFinish = (values) =>
    createWithDetails(values)
      .then(() => {
        message.success("Success add product variant");
      })
      .finally(() => onClose());

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Form
      form={form}
      defaultValue={detail}
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item name={"product_id"}>
        <Select placeholder="Product">
          {products.map((data) => (
            <Select.Option value={data.id} key={data.id}>
              {data.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="product_variant_name">
        <Input placeholder="Product Variant Name" />
      </Form.Item>

      <Form.Item name="price">
        <Input placeholder="Price" type="number" prefix="Rp." />
      </Form.Item>
      <Form.List name="variant_values">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "variant_id"]}
                  style={{ width: 200 }}
                  rules={[{ required: true, message: "Missing variant" }]}
                >
                  <Select placeholder="Variant">
                    {variants.map((data) => (
                      <Select.Option value={data.id} key={data.id}>
                        {data.variant}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  rules={[{ required: true, message: "Missing last name" }]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button
          loading={false}
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
