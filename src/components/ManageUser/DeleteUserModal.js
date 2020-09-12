import { Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import UpdateUserForm from "./UpdateUserForm.js";
export default class UpdateUserModal extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Update
        </Button>
        <Modal
          visible={visible}
          title="Update User"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              form="updateUserForm"
              htmlType="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <UpdateUserForm id="updateUserForm" />
        </Modal>
      </>
    );
  }
}
