import { Table } from "antd";
import { useEffect, useMemo } from "react";
import useRole from "../../../hooks/api/useRole";

export default function RoleTable() {
  const { getAll, roles } = useRole();

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
