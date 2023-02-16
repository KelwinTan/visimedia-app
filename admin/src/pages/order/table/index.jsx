import { Button, Popconfirm, Space, Table, Divider, message } from "antd";
import { useEffect, useMemo } from "react";
import useOrder from "../../../hooks/api/useOrder";
import toIDR from "src/shared/currency/toIDR";
import { Fragment } from "react";
import { useCallback } from "react";

export default function VariantTable() {
  const { getAll, order, verify } = useOrder();

  const onVerify = useCallback(
    async (id) => {
      try {
        await verify(id);
        message.success({ content: "success verify", key: "verify-notif" });
      } catch (error) {
        message.error({ content: "faiked to verify", key: "verify-notif" });
      }
    },
    [verify]
  );

  useEffect(() => {
    getAll();
  }, [getAll]);

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "order_detail_id",
        key: "order_details",
        render: (_, record) => record.order_details.id,
      },

      {
        title: "Produk",
        dataIndex: "product_name",
        key: "order_items",
        render: (_, record) => (
          <>
            {record.order_items.map((item, idx, arr) => (
              <Fragment key={idx}>
                <div>{item.product_name}</div>
                {idx < arr.length - 1 && <Divider />}
              </Fragment>
            ))}
          </>
        ),
      },

      {
        title: "Kategori",
        dataIndex: "product_category_name",
        key: "order_items",
        render: (_, record) => (
          <>
            {record.order_items.map((item, idx, arr) => (
              <Fragment key={idx}>
                <div>{item.product_category_name}</div>
                {idx < arr.length - 1 && <Divider />}
              </Fragment>
            ))}
          </>
        ),
      },

      {
        title: "Qty",
        dataIndex: "quantity",
        key: "order_items",
        render: (_, record) => (
          <>
            {record.order_items.map((item, idx, arr) => (
              <Fragment key={idx}>
                <div>
                  {item.quantity} x Rp.{toIDR(item.price)}
                </div>
                {idx < arr.length - 1 && <Divider />}
              </Fragment>
            ))}
          </>
        ),
      },

      {
        title: "Harga",
        dataIndex: "price",
        key: "order_items",
        render: (_, record) => {
          const finalPrice = record.order_items.reduce(
            (acc, data) => acc + data.quantity * Number(data.price),
            0
          );
          return <div>Rp.{toIDR(finalPrice)}</div>;
        },
      },

      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle" direction="vertical">
            <Popconfirm
              title="Are you sure to verify this order?"
              okText="Yes"
              onConfirm={() => onVerify(record.order_details.id)}
              cancelText="No"
            >
              <a href="#">
                <Button disabled={record.order_details.order_verified}>
                  verify
                </Button>
              </a>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [onVerify]
  );

  return (
    <>
      <Table
        dataSource={order.map((data, idx) => ({ ...data, key: idx }))}
        columns={columns}
      />
    </>
  );
}
