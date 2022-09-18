import { Button, Form, Image, Input, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useBanner } from "../../../context/banner-context";

export default function BannerForm({ id, onClose }) {
  const { loading, create, update, getDetail } = useBanner();
  const [detail, setDetail] = useState({});
  const imageRef = useRef(null);
  const [form] = Form.useForm();

  const onAdd = async ({ name, url_redirect }) => {
    try {
      await create({ name, url_redirect, image: imageRef.current });
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

  const onUpdate = async ({ name, url_redirect }) => {
    try {
      const payload = {
        id: detail.id,
        name,
        url_redirect,
      };
      console.log("imageref current", imageRef.current);
      if (imageRef.current) {
        payload.image = imageRef.current;
      }
      await update(payload);
      message.success("Success update banner");
      onClose();
    } catch (error) {
      message.error("Error: " + error);
    }
  };

  const onFinish = ({ name, url_redirect }) => {
    if (id) {
      onUpdate({ name, url_redirect });
    } else {
      onAdd({ name, url_redirect });
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

  useEffect(() => {
    if (id) {
      getDetail(id).then((data) => {
        form.setFieldsValue({
          name: data.name,
          url_redirect: data.url_redirect,
        });
        setDetail({
          ...data,
          public_image_path:
            process.env.REACT_APP_IMAGE_URL + data.public_image_path,
        });
      });
    } else {
      setDetail({});
    }
  }, [form, getDetail, id]);

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

      <Form.Item label="Redirect URL" name="url_redirect">
        <Input />
      </Form.Item>

      {Boolean(detail.public_image_path) && (
        <Image width={200} src={detail.public_image_path} />
      )}
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
