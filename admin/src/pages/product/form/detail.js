import { Button, Card, Form, Input, message, Select, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCategory } from "../../../context/category-context";
import { useProduct } from "../../../context/product-context";
import { useVariant } from "../../../context/variant-context";
import useSearchParams from "../../../hooks/useSearchParams";
import uniqueKey from "../../../shared/uniqueKey";
import { DeleteOutlined } from "@ant-design/icons";
import transformError from "../../../shared/transformError";

export default function ProductForm() {
  const { id } = useSearchParams();
  const history = useHistory();

  const { loading, create, getDetail, update } = useProduct();
  const { categories, getAll } = useCategory();
  const {
    variants: listVariants,
    getAll: getAllVariants,
    removeProductVariant,
  } = useVariant();

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

        const variants = payloadWithoutImage.productVariantsData?.map((vr) => {
          const variantValues = vr.variantValues?.flat()?.reduce((curr, v) => {
            curr[v?.variant?.variant] = v.value;
            return curr;
          }, {});
          return {
            id: vr.id,
            product_variant_name: vr.product_variant_name,
            variant_price: vr.price,
            ...variantValues,
          };
        });
        form.setFieldsValue({ ...payloadWithoutImage, variants });

        setDetailVariants(() => {
          return payloadWithoutImage.productVariantsData?.map((vr) => {
            return vr.variantValues?.flat()?.map((v) => ({
              ...v.variant,
              value: v.value,
            }));
          });
        });

        setDetail({
          ...data,
          public_image_url:
            process.env.REACT_APP_IMAGE_URL + data.public_image_path,
          productVariantsData: payloadWithoutImage.productVariantsData?.map(
            (vr) => {
              return {
                ...vr,
                variantValues: vr.variantValues?.flat(),
              };
            }
          ),
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
    const variant_values = variants?.map((data, idx) => {
      const { product_variant_name, variant_price, ...variantField } = data;
      const variant_ids = listVariants
        .filter((v) => variantField[v.variant])
        .map((v) => {
          const variantIdData = {
            variant_id: v.id,
            value: variantField[v.variant],
          };
          if (id) {
            let variantValue = {};
            detail.productVariantsData.forEach((pv) => {
              pv.variantValues.forEach((pvVariantValue) => {
                if (pvVariantValue.variant.id === v.id) {
                  variantValue = pvVariantValue;
                }
              });
            });
            if (variantValue?.id)
              variantIdData.variant_value_id = variantValue?.id;
          }
          return variantIdData;
        });
      const variantData = { product_variant_name, variant_price, variant_ids };
      if (id) {
        if (detail.productVariantsData[idx]?.id)
          variantData.product_variant_id = detail.productVariantsData[idx]?.id;
      }
      return variantData;
    });

    // console.log({ variant_values });
    // return;

    const payload = {
      ...productField,
      variant_values,
      image: imageRef.current,
    };

    const api = id ? update({ ...payload, id }) : create(payload);
    try {
      await api;
      message.success(`Success ${id ? "update" : "add"} a product`);
      history.push("/product");
    } catch (error) {
      const errorMsg = transformError(error);
      message.error("Error: " + errorMsg);
    }
  };

  const onRemoveProductVariant = async (idx) => {
    try {
      const id = detail.productVariantsData[idx]?.id;
      await removeProductVariant(id);
      setDetailVariants((d) => [...d.slice(0, idx), ...d.slice(idx)]);
      setDetail({
        ...detail,
        productVariantsData: [
          ...detail.productVariantsDatas.slice(0, idx),
          ...detail.productVariantsDatas.slice(idx),
        ],
      });
    } catch (error) {}
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
          <Input.TextArea showCount maxLength={1000} rows={4} />
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

        <Form.List name="variants">
          {(fields, { add, remove }) => (
            <>
              <Button
                onClick={() => {
                  const values = { ...form.getFieldsValue() };

                  setDetailVariants((p) => {
                    const selectedVariants = listVariants.filter((d) =>
                      d.variant.toLowerCase().includes("size")
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
                <Card
                  key={f.key + uniqueKey()}
                  title={`Variant ${idx + 1}`}
                  style={{ marginBottom: 14 }}
                  extra={
                    <DeleteOutlined
                      onClick={() => {
                        onRemoveProductVariant(idx).then(() => remove(idx));
                      }}
                    />
                  }
                >
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
            {id ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
