import { Modal } from "antd";
import { useCallback, useState } from "react";
import LayoutContent from "../../components/Layout/Content";
import VariantForm from "./form/add";
import VariantTable from "./table";

function Category() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const onClose = useCallback(() => {
    setSelectedId(null);
    setShowModal(false);
  }, []);

  const onUpdate = useCallback((id) => {
    setSelectedId(id);
    setShowModal(true);
  }, []);

  return (
    <>
      {showModal && (
        <Modal
          title={selectedId ? "Variant Detail" : "Add Variant"}
          visible={true}
          onCancel={() => {
            setSelectedId(null);
            setShowModal(false);
          }}
          footer={null}
        >
          <VariantForm id={selectedId} onClose={onClose} />
        </Modal>
      )}

      <LayoutContent
        title="Variant"
        actions={[
          {
            text: "Add Variant",
            type: "primary",
            onClick: () => {
              setShowModal(true);
            },
          },
        ]}
      >
        <VariantTable onUpdate={onUpdate} />
      </LayoutContent>
    </>
  );
}

export default Category;
