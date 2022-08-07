import { Modal } from "antd";
import { useEffect, useState } from "react";
import LayoutContent from "../../components/Layout/Content";
import useRole from "../../hooks/api/useRole";
import BannerForm from "./form/add";
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
        title="Role Detail"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <BannerForm id={selectedId} />
      </Modal>
      <LayoutContent
        title="Role"
        actions={[
          {
            text: "Add Role",
            type: "primary",
            onClick: () => {
              console.log("aslkdas");
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
