import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useCategory } from "../../../context/category-context";
import { useProduct } from "../../../context/product-context";
import { useVariant } from "../../../context/variant-context";
import useSearchParams from "../../../hooks/useSearchParams";
import uniqueKey from "../../../shared/uniqueKey";

export default function ProductForm() {
  const { id } = useSearchParams();

  const { loading, create, getDetail, update } = useProduct();
  const { categories, getAll } = useCategory();
  const { variants: listVariants, getAll: getAllVariants } = useVariant();

  const [detail, setDetail] = useState({});
  const [detailVariants, setDetailVariants] = useState([]);

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

  const onFinish = async (fields) => {
    const { variants, ...productField } = fields;
    /**
     * remapping between variant label to variant id
     */
    const variant_values = variants?.map((data) => {
      const { product_variant_name, variant_price, ...variantField } = data;
      const variant_ids = listVariants
        .filter((v) => variantField[v.variant])
        .map((v) => ({ id: v.id, value: variantField[v.variant] }));
      return { product_variant_name, variant_price, variant_ids };
    });

    const payload = {
      ...productField,
      variant_values,
      image: imageRef.current,
    };

    const api = id ? update({ ...payload, id }) : create(payload);
    try {
      const response = await api;
      console.log(response);
      message.success("Success update a banner");
    } catch (error) {
      const errorResponse = error.response?.data?.errors || undefined;
      if (errorResponse) {
        const [_error] = Object.entries(errorResponse);
        message.error("Error: " + _error[1]);
      }
    }
  };

  return (
    <Card>
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

        <Typography
          style={{ fontWeight: "bold", marginBottom: 10, fontSize: "1rem" }}
        >
          Variant Produk
        </Typography>

        {listVariants.map((d, idx) => (
          <React.Fragment key={idx}>
            <Form.Item name={d.variant} valuePropName="checked">
              <Checkbox>{d.variant}</Checkbox>
            </Form.Item>
          </React.Fragment>
        ))}

        <Form.List name="variants">
          {(fields, { add }) => (
            <>
              <Button
                onClick={() => {
                  const values = { ...form.getFieldsValue() };

                  setDetailVariants((p) => {
                    const selectedVariants = listVariants.filter(
                      (d) => values[d.variant]
                    );
                    return [...p].concat([selectedVariants]);
                  });

                  listVariants.forEach((d) => {
                    values[d.variant] = false;
                  });
                  form.setFieldsValue(values);
                  add();
                }}
                style={{ marginBottom: 14 }}
              >
                Tambahkan varian
              </Button>
              <Typography
                style={{
                  fontWeight: "bold",
                  marginBottom: 10,
                  fontSize: "1rem",
                }}
              >
                Tabel Varian
              </Typography>

              {fields.map((f, idx) => (
                <Card key={f.key} style={{ marginBottom: 14 }}>
                  <Form.Item
                    {...f}
                    label="Varian Name"
                    name={[f.name, "product_variant_name"]}
                  >
                    <Input placeholder="Varian Name" />
                  </Form.Item>

                  {detailVariants[idx].map((v) => (
                    <Form.Item
                      {...f}
                      key={f.key + uniqueKey()}
                      label={v.variant}
                      name={[f.name, v.variant]}
                    >
                      <Input placeholder={v.variant} />
                    </Form.Item>
                  ))}

                  <Form.Item
                    {...f}
                    label="Harga"
                    name={[f.name, "variant_price"]}
                  >
                    <Input placeholder="Harga" type="number" prefix="Rp." />
                  </Form.Item>
                </Card>
              ))}
            </>
          )}
        </Form.List>

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
    </Card>
  );
}
