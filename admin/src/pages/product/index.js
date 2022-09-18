import { Modal } from "antd";
import { useCallback, useState } from "react";
import LayoutContent from "../../components/Layout/Content";
import ProductForm from "./form/add";
import ProductTable from "./table";

function Category() {
  const [showModal, setShowModal] = useState({
    product: false,
  });
  const [selectedId, setSelectedId] = useState(null);

  const onClose = useCallback(() => {
    setSelectedId(null);
    setShowModal({ product: false, variant: false });
  }, []);

  const onUpdate = useCallback((id) => {
    setSelectedId(id);
    setShowModal((d) => ({ ...d, product: true }));
  }, []);

  return (
    <>
      {showModal.product && (
        <Modal
          title={selectedId ? "Product Detail" : "Add Product"}
          visible={true}
          onCancel={() => {
            setSelectedId(null);
            setShowModal((d) => ({ ...d, product: false }));
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
              setShowModal((d) => ({ ...d, product: true }));
            },
          },
        ]}
      >
        <ProductTable onUpdate={onUpdate} />
      </LayoutContent>
    </>
  );
}

export default Category;
