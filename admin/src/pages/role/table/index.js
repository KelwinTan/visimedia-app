import { Button, Popconfirm, Space, Table } from "antd";
import { useEffect, useMemo } from "react";
import useRole from "../../../hooks/api/useRole";

export default function RoleTable() {
  const { getAll, roles, remove } = useRole();

  useEffect(() => {
    getAll();
  }, [getAll]);

  const onDelete = async (id) => {
    await remove({ id });
  };

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record, idx) => {
          /**
           * record.id
           * 1. super admin
           * 2. admin
           * 3. user
           *
           * cant delete
           */
          if (record.id < 4) return null;
          return (
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
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Table
        dataSource={roles.map((data, idx) => ({ ...data, key: idx }))}
        columns={columns}
      />
    </>
  );
}
