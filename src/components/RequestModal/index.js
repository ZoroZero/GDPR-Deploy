import React from "react";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "features/ManageRequest/slice";
import RequestForm from "components/CreateRequestForm";

const RequestModal = (props) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.requestManagement);

  function onSetModal(isShow) {
    dispatch(setModal({ showModal: isShow }));
  }
  return (
    <>
      <Button type="primary" onClick={() => onSetModal(true)}>
        Create new request
      </Button>
      <Modal
        visible={showModal}
        footer={null}
        onCancel={() => onSetModal(false)}
      >
        <RequestForm />
      </Modal>
    </>
  );
};

export default RequestModal;
