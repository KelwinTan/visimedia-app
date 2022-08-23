import { Button, Image, Popconfirm, Space, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useCategory } from "../../../context/category-context";

export default function CategoryTable() {
  const { getAll, remove, categories } = useCategory();

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
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle" direction="vertical">
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
        dataSource={categories.map((data, idx) => ({ ...data, key: idx }))}
        columns={columns}
      />
    </>
  );
}
