import { Button, Image, Popconfirm, Space, Table } from "antd";
import { useEffect, useMemo } from "react";
import { useBanner } from "../../../context/banner-context";

export default function BannerTable({ onUpdate }) {
  const { getAll, remove, banners } = useBanner();

  useEffect(() => {
    getAll();
  }, [getAll]);

  const onDelete = async (id) => {
    await remove(id);
  };

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Image",
        dataIndex: "public_image_path",
        key: "public_image_path",
        render: (value) => {
          return (
            <Image width={200} src={process.env.REACT_APP_IMAGE_URL + value} />
          );
        },
      },
      {
        title: "Redirect URL",
        dataIndex: "url_redirect",
        key: "url_redirect",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle" direction="vertical">
            <Button onClick={() => onUpdate(record.id)}>Update</Button>
            <Popconfirm
              title="Are you sure to delete this data?"
              onConfirm={() => onDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">
                <Button>Delete</Button>
              </a>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Table
        dataSource={banners.map((data, idx) => ({ ...data, key: idx }))}
        columns={columns}
      />
    </>
  );
}
