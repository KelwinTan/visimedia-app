import { Button, Form, Input, message, Select, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useCategory } from "../../../context/category-context";
import { useProduct } from "../../../context/product-context";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useVariant } from "../../../context/variant-context";

export default function ProductForm({ id, onClose }) {
  const { loading, create, getDetail, update } = useProduct();
  const { categories, getAll } = useCategory();
  const { variants, getAll: getAllVariants, createWithDetails } = useVariant();

  const [detail, setDetail] = useState({});
  const imageRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getAll();
    getAllVariants();
  }, [getAll, getAllVariants]);

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
  }, [getDetail, form, id]);

  const onChangeImage = (file) => {
    imageRef.current = file;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setDetail((d) => ({ ...d, public_image_path: fileReader.result }));
    };
    fileReader.readAsDataURL(file);
  };

  const onFinish = async (payload) => {
    const { product_variant_name, price, variant_values, ...productField } =
      payload;
    const api = id ? update(productField) : create(productField);
    try {
      const response = await api;
      const variantPayload = {
        product_variant_name,
        price,
        variant_values,
        product_id: response?.product?.id || id,
      };
      await createWithDetails(variantPayload);
      message.success("Success update a new banner");
      onClose();
    } catch (error) {
      const errorResponse = error.response?.data?.errors || undefined;
      if (errorResponse) {
        const [_error] = Object.entries(errorResponse);
        message.error("Error: " + _error[1]);
      }
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

      <Form.Item label="Product Variant" name="product_variant_name">
        <Input placeholder="Product Variant Name" />
      </Form.Item>

      <Form.Item label="Product Variant Price" name="price">
        <Input placeholder="Product Variant Price" type="number" prefix="Rp." />
      </Form.Item>

      {variants.map((d, idx) => (
        <React.Fragment key={idx}>
          <Form.Item label={d.variant} name={[d.variant, "value"]} rules={[]}>
            <Input placeholder="Value" />
          </Form.Item>
        </React.Fragment>
      ))}

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
