import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import useBanner from "../../../hooks/api/useBanner";

export default function BannerForm({ id }) {
  const { create, update, getDetail } = useBanner();
  const [detail, setDetail] = useState({});
  const [image, setImage] = useState(null);

  const onAdd = async ({ name }) => {
    await create({ name, image });
    setImage(null);
  };

  const onUpdate = async ({ name }) => {
    await update({ name, image });
    setImage(null);
  };

  const onFinish = ({ name }) => {
    if (id) {
      onUpdate({ name });
    } else {
      onAdd({ name });
    }
  };

  useEffect(() => {
    if (id) {
      getDetail(id).then((data) => {
        console.log({ data });
      });
    }
  }, [getDetail, id]);

  return (
    <Form
      name="basic"
      initialValues={detail}
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
        label="Image"
        name="image"
        rules={[{ required: true, message: "Please input image" }]}
      >
        <Input type={"file"} onChange={(e) => setImage(e.target.files[0])} />
      </Form.Item>

      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
