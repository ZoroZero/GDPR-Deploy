import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Modal , Row, Col } from "antd";

const ManageServersModal = (props) => {
  const dispatch = useDispatch();

  const { dataServers } = useSelector((state) => state.customerManagement);

  return (
  <Modal 
        title="Manage Servers"
        centered
        visible={props.modalVisible}
        forceRender={true}
        onOk={handleOk}
        onCancel={handleCancel}
>
<Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>

  </Modal>
  );
};

ManageServersModal.propTypes = {};

export default ManageServersModal;
