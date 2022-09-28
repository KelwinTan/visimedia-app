import { Button, message, Popconfirm, Space, Table } from "antd";
import { useEffect, useMemo } from "react";
import { useBestProduct } from "../../../context/best-product-context";

export default function BestProductTable({}) {
  const { getAll, products, remove } = useBestProduct();

  useEffect(() => {
    getAll();
  }, [getAll]);

  const onDelete = async (id) => {
    try {
      await remove(id);
      message.success("Success delete product");
    } catch (error) {
      message.error(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "product",
        key: "name",
        render: (record) => {
          return record.name;
        },
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
                <Button danger>Delete</Button>
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
        dataSource={products.map((data, idx) => ({ ...data, key: idx }))}
        columns={columns}
      />
    </>
  );
}
