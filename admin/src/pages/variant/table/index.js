import { Button, Image, Popconfirm, Space, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useProduct } from "../../../context/product-context";
import { useVariant } from "../../../context/variant-context";

export default function VariantTable({ onUpdate }) {
  const { getAll, variants, remove } = useVariant();

  useEffect(() => {
    getAll();
  }, []);

  const onDelete = async (id) => {
    await remove(id);
  };

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "variant",
        key: "variant",
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
        dataSource={variants.map((data, idx) => ({ ...data, key: idx }))}
        columns={columns}
      />
    </>
  );
}
