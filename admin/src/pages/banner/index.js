import { Modal } from "antd";
import { useCallback, useState } from "react";
import BannerForm from "./form/add";
import BannerTable from "./table";

function Banner() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const onUpdate = useCallback((id) => {
    setSelectedId(id);
    showModal(true);
  }, []);

  return (
    <>
      <Modal
        title="Banner Detail"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <BannerForm id={selectedId} />
      </Modal>
      <BannerTable onUpdate={onUpdate} />
    </>
  );
}

export default Banner;
