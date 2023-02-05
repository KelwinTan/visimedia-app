import { Modal } from "antd";
import { useCallback, useState } from "react";
import LayoutContent from "../../components/Layout/Content";
import CategoryForm from "./form/add";
import CategoryTable from "./table";

function Category() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const onClose = useCallback(() => {
    setSelectedId(null);
    setShowModal(false);
  }, []);

  return (
    <>
      {showModal && (
        <Modal
          title={selectedId ? "Category Detail" : "Add Category"}
          visible={true}
          onCancel={() => {
            setSelectedId(null);
            setShowModal(false);
          }}
          footer={null}
        >
          <CategoryForm id={selectedId} onClose={onClose} />
        </Modal>
      )}

      <LayoutContent
        title="Category"
        actions={[
          {
            text: "Add Category",
            type: "primary",
            onClick: () => {
              setShowModal(true);
            },
          },
        ]}
      >
        <CategoryTable />
      </LayoutContent>
    </>
  );
}

export default Category;
