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

      {
        title: "SKU",
        dataIndex: "sku",
        key: "sku",
      },

      {
        title: "Price",
        dataIndex: "price",
        key: "price",
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
