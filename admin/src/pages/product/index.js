import { Modal } from "antd";
import { useCallback, useState } from "react";
import LayoutContent from "../../components/Layout/Content";
import ProductForm from "./form/add";
import ProductTable from "./table";

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
          title={selectedId ? "Product Detail" : "Add Product"}
          visible={true}
          onCancel={() => {
            setSelectedId(null);
            setShowModal(false);
          }}
          footer={null}
        >
          <ProductForm id={selectedId} onClose={onClose} />
        </Modal>
      )}

      <LayoutContent
        title="Product"
        actions={[
          {
            text: "Add Product",
            type: "primary",
            onClick: () => {
              setShowModal(true);
            },
          },
        ]}
      >
        <ProductTable />
      </LayoutContent>
    </>
  );
}

export default Category;
