import { Table } from "antd";
import { useEffect, useMemo } from "react";
import useRole from "../../../hooks/api/useRole";

export default function RoleTable({ onUpdate }) {
  const { getAll } = useRole();

  useEffect(() => {
    getAll().then((data) => console.log({ data }));
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
        dataSource={[
          {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
          },
          {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
          },
        ]}
        columns={columns}
      />
    </>
  );
}
