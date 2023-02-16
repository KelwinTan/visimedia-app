import { Modal } from "antd";
import { useCallback, useState } from "react";
import LayoutContent from "../../components/Layout/Content";
import OrderStatusForm from "./form/add";
import OrderStatusTable from "./table";

function Category() {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const onClose = useCallback(() => {
    setSelectedData(null);
    setShowModal(false);
  }, []);

  return (
    <>
      {showModal && (
        <Modal
          title={selectedData ? "Order Status Detail" : "Add Order Status"}
          visible={true}
          onCancel={() => {
            setSelectedData(null);
            setShowModal(false);
          }}
          footer={null}
        >
          <OrderStatusForm data={selectedData} onClose={onClose} />
        </Modal>
      )}

      <LayoutContent
        title="Order Status"
        actions={[
          {
            text: "Add Order Status",
            type: "primary",
            onClick: () => {
              setShowModal(true);
            },
          },
        ]}
      >
        <OrderStatusTable
          onUpdate={(data) => {
            setSelectedData(data);
            setShowModal(true);
          }}
        />
      </LayoutContent>
    </>
  );
}

export default Category;
