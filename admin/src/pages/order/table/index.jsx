import {
  Button,
  Popconfirm,
  Space,
  Table,
  Divider,
  message,
  Select,
  Dropdown,
} from "antd";
import { useEffect, useMemo } from "react";
import useOrder from "../../../hooks/api/useOrder";
import toIDR from "src/shared/currency/toIDR";
import { Fragment } from "react";
import { useCallback } from "react";
import useOrderStatus from "../../../hooks/api/useOrderStatus";
import usePayment from "src/hooks/api/usePayment";

export default function VariantTable() {
  const { getAll, order, verify } = useOrder();
  const { getAll: getAllStatus, orderStatus } = useOrderStatus();
  const { updateStatus } = usePayment();

  const onVerify = useCallback(
    async (id) => {
      try {
        await verify(id);
        message.success({ content: "success verify", key: "verify-notif" });
        getAll("Verifikasi Pembayaran");
      } catch (error) {
        message.error({ content: "faiked to verify", key: "verify-notif" });
      }
    },
    [getAll, verify]
  );

  useEffect(() => {
    getAll("Verifikasi Pembayaran");
    getAllStatus();
  }, [getAll, getAllStatus]);

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

            <Dropdown
              menu={{
                items: orderStatus.map((status, idx) => ({
                  key: String(idx),
                  label: status.status,
                  onClick: async () => {
                    if (record.order_details?.payment_id) {
                      updateStatus(record.order_details?.payment_id, status.id);
                    }
                  },
                })),
              }}
              trigger={["click"]}
            >
              <Button onClick={(e) => e.preventDefault()}>Change Status</Button>
            </Dropdown>
          </Space>
        ),
      },
    ],
    [onVerify, orderStatus, updateStatus]
  );

  return (
    <>
      <Select
        onChange={(val) => {
          getAll(val);
        }}
        placeholder="Order Status"
        style={{ marginBottom: 10, minWidth: 200 }}
      >
        {orderStatus.map((status) => (
          <Select.Option key={status.status} value={status.status}>
            {status.status}
          </Select.Option>
        ))}
      </Select>
      <Table
        dataSource={order.map((data, idx) => ({ ...data, key: idx }))}
        columns={columns}
      />
    </>
  );
}
