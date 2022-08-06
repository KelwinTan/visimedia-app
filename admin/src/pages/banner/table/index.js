import { Button, Popconfirm, Space, Table } from "antd";
import { useEffect, useMemo } from "react";
import useBanner from "../../../hooks/api/useBanner";

export default function BannerTable({ onUpdate }) {
  const { getAll, remove } = useBanner();

  useEffect(() => {
    getAll().then((data) => console.log({ data }));
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
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => onUpdate(record.id)}>Update</Button>
            <Popconfirm
              title="Are you sure to delete this data?"
              onConfirm={() => onDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Delete</a>
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
        dataSource={[
          {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
          },
          {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
          },
        ]}
        columns={columns}
      />
    </>
  );
}
