import { Modal } from "antd";
import { useCallback, useState } from "react";
import LayoutContent from "../../components/Layout/Content";
import BannerForm from "./form/add";
import BannerTable from "./table";

function Banner() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const onUpdate = useCallback((id) => {
    setSelectedId(id);
    setShowModal(true);
  }, []);

  const onClose = useCallback(() => {
    setSelectedId(null);
    setShowModal(false);
  }, []);

  return (
    <>
      {showModal && (
        <Modal
          title={selectedId ? "Banner Detail" : "Add Banner"}
          visible={true}
          onCancel={() => {
            setSelectedId(null);
            setShowModal(false);
          }}
          footer={null}
        >
          <BannerForm id={selectedId} onClose={onClose} />
        </Modal>
      )}

      <LayoutContent
        title="Banner"
        actions={[
          {
            text: "Add Banner",
            type: "primary",
            onClick: () => {
              setShowModal(true);
            },
          },
        ]}
      >
        <BannerTable onUpdate={onUpdate} />
      </LayoutContent>
    </>
  );
}

export default Banner;
