import { Button, Image, Popconfirm, Space, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useProduct } from "../../../context/product-context";

export default function ProductTable({ onUpdate }) {
  const { getAll, products, remove } = useProduct();

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

      // {
      //   title: "SKU",
      //   dataIndex: "sku",
      //   key: "sku",
      // },

      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (val) => "Rp." + Number(val).toLocaleString("id-ID"),
      },
      {
        title: "Image",
        dataIndex: "public_image_url",
        key: "public_image_url",
        render: (value) => {
          console.log({ value });
          return (
            value && (
              <Image
                width={200}
                src={process.env.REACT_APP_IMAGE_URL + value}
              />
            )
          );
        },
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
        dataSource={products.map((data, idx) => ({ ...data, key: idx }))}
        columns={columns}
      />
    </>
  );
}
