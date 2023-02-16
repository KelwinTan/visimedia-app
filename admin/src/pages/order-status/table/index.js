import { Button, message, Popconfirm, Space, Table } from "antd";
import { useCallback } from "react";
import { useEffect, useMemo } from "react";
import useOrderStatus from "src/hooks/api/useOrderStatus";

export default function OrderStatusTable({ onUpdate }) {
  const { orderStatus, remove, getAll } = useOrderStatus();

  useEffect(() => {
    getAll();
  }, [getAll]);

  const onDelete = useCallback(
    async (id) => {
      try {
        await remove(id);
        message.success("Success remove order status");
      } catch (error) {
        message.error("Failed to remove order status");
      }
    },
    [remove]
  );

  const columns = useMemo(
    () => [
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle" direction="vertical">
            <Button onClick={() => onUpdate(record)}>Edit</Button>

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
    [onDelete, onUpdate]
  );

  return (
    <>
      <Table
        dataSource={orderStatus.map((data, idx) => ({ ...data, key: idx }))}
        columns={columns}
      />
    </>
  );
}
