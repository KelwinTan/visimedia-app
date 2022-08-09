import { Modal } from "antd";
import { useCallback, useState } from "react";
import LayoutContent from "../../components/Layout/Content";
import RoleForm from "./form/add";
import RoleTable from "./table";

function Role() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const onClose = useCallback(() => {
    setSelectedId(null);
    setShowModal(false);
  }, []);

  return (
    <>
      <Modal
        title={!selectedId ? "Add Role" : "Role Detail"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <RoleForm id={selectedId} onClose={onClose} />
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
