import { Button, Form, Image, Input, message, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { useBanner } from "../../../context/banner-context";
import { useCategory } from "../../../context/category-context";
import { useProduct } from "../../../context/product-context";

export default function ProductForm({ id, onClose }) {
  const { loading, create } = useProduct();
  const { categories, getAll } = useCategory();

  const [detail, setDetail] = useState({});
  const imageRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getAll();
  }, [getAll]);

  const onAdd = async ({
    name,
    description,
    sku = "",
    price,
    image,
    category_id,
    quantity,
  }) => {
    try {
      await create({
        name,
        description,
        sku,
        price,
        image,
        category_id,
        quantity,
        image: imageRef.current,
      });
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

  const onChangeImage = (file) => {
    imageRef.current = file;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setDetail((d) => ({ ...d, public_image_path: fileReader.result }));
    };
    fileReader.readAsDataURL(file);
  };

  const onFinish = ({
    name,
    description,
    sku,
    price,
    image,
    category_id,
    quantity,
  }) => {
    onAdd({ name, description, sku, price, image, category_id, quantity });
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

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input description" }]}
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
        label="Image"
        name="image"
        rules={[{ required: !id, message: "Please input image" }]}
      >
        <Input
          type={"file"}
          accept="image/*"
          onChange={(e) => onChangeImage(e.target.files[0])}
        />
      </Form.Item>

      {/* <Form.Item
        label="Sku"
        name="sku"
        rules={[{ required: true, message: "Please input sku" }]}
      >
        <Input />
      </Form.Item> */}

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
