import { Modal } from "antd";
import { useState } from "react";
import LayoutContent from "../../components/Layout/Content";
import BestProductForm from "./form/add";
import BestProductTable from "./table";

export default function BestProduct() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal
          title={"Add Best Product"}
          visible
          onCancel={() => {
            setShowModal(false);
          }}
          footer={null}
        >
          <BestProductForm onClose={() => setShowModal(false)} />
        </Modal>
      )}

      <LayoutContent
        title="Best Product"
        actions={[
          {
            text: "Add Best Product",
            type: "primary",
            onClick: () => {
              setShowModal(true);
            },
          },
        ]}
      >
        <BestProductTable />
      </LayoutContent>
    </>
  );
}
