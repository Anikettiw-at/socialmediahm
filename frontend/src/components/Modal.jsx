import React from "react";
import UserListModal from "./UserListModal";

const Modal = ({ value, title, setShow }) => {
  return (
    <UserListModal
      title={title}
      users={value}
      onClose={() => setShow(false)}
      emptyText={`No ${title?.toLowerCase()} yet`}
    />
  );
};

export default Modal;
