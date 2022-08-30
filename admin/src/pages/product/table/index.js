import { Button, Image, Popconfirm, Space, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useCategory } from "../../../context/category-context";
import { useProduct } from "../../../context/product-context";

export default function ProductTable() {
  const { getAll, products } = useProduct();

  useEffect(() => {
    getAll();
  }, [getAll]);

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
