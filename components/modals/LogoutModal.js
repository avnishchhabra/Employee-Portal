import { Modal } from "antd";
import { useRouter } from "next/router";
import React from "react";
import LS from "../../utils/Ls";

const LogoutModal = ({ isModalOpen, handleCancel }) => {
    const router = useRouter()
  const handleOk = () => {
    LS.delete("token");
    LS.delete("user");
    router.push('/')
    location.reload();
  };
  return (
    <Modal
      title="LOG OUT"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Are are sure, you want to logout ?</p>
    </Modal>
  );
};

export default LogoutModal;
