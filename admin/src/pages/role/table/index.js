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
