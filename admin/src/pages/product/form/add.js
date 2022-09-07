import { Button, Form, Image, Input, message, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useBanner } from "../../../context/banner-context";
import { useCategory } from "../../../context/category-context";
import { useProduct } from "../../../context/product-context";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function ProductForm({ id, onClose }) {
  const { loading, create, getDetail, update } = useProduct();
  const { categories, getAll } = useCategory();

  const [detail, setDetail] = useState({});
  const imageRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getAll();
  }, [getAll]);

  useEffect(() => {
    if (id) {
      getDetail(id).then((data) => {
        const { image, ...payloadWithoutImage } = data;
        form.setFieldsValue(payloadWithoutImage);
        setDetail({
          ...data,
          public_image_url:
            process.env.REACT_APP_IMAGE_URL + data.public_image_path,
        });
      });
    } else {
      setDetail({});
    }
  }, [getDetail, id]);

  const onAdd = async ({
    name,
    description,
    sku = "",
    price,
    image,
    category_id,
    quantity,
    tokopedia_link,
    shopee_link,
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
        tokopedia_link,
        shopee_link,
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

  const onUpdate = async ({
    name,
    description,
    sku = "",
    price,
    image,
    category_id,
    quantity,
    tokopedia_link,
    shopee_link,
  }) => {
    try {
      await update({
        name,
        description,
        sku,
        price,
        image,
        category_id,
        quantity,
        image: imageRef.current,
        id,
        tokopedia_link,
        shopee_link,
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

  const onFinish = ({
    name,
    description,
    sku,
    price,
    image,
    category_id,
    quantity,
    tokopedia_link,
    shopee_link,
  }) => {
    if (id) {
      onUpdate({
        name,
        description,
        sku,
        price,
        image,
        category_id,
        quantity,
        tokopedia_link,
        shopee_link,
      });
    } else {
      onAdd({
        name,
        description,
        sku,
        price,
        image,
        category_id,
        quantity,
        tokopedia_link,
        shopee_link,
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

      <Form.Item label="Shopee Link" name="shopee_link">
        <Input />
      </Form.Item>

      <Form.Item label="Tokopdia Link" name="tokopedia_link">
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
