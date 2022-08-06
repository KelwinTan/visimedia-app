import { Button, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import useRole from "../../hooks/api/useRole";
import BannerForm from "./form/add";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button>Detail</Button>
        <Button>Delete</Button>
        <Button>Update</Button>
      </Space>
    ),
  },
];

function Role() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { getAll } = useRole();

  useEffect(() => {
    getAll().then((data) => console.log({ data }));
  }, [getAll]);

  return (
    <>
      <Modal
        title="Banner Detail"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <BannerForm id={selectedId} />
      </Modal>
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
      ;
    </>
  );
}

export default Role;
