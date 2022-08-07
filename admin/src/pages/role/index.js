import { Modal } from "antd";
import { useEffect, useState } from "react";
import LayoutContent from "../../components/Layout/Content";
import useRole from "../../hooks/api/useRole";
import RoleForm from "./form/add";
import RoleTable from "./table";

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
        title={!selectedId ? "Add Role" : "Role Detail"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <RoleForm id={selectedId} />
      </Modal>
      <LayoutContent
        title="Role"
        actions={[
          {
            text: "Add Role",
            type: "primary",
            onClick: () => {
              setShowModal(true);
            },
          },
        ]}
      >
        <RoleTable />
      </LayoutContent>
    </>
  );
}

export default Role;
