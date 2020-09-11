import React from "react";
import { Input, Form, Button, Row, Col } from "antd";
import { approveRequest, cancelRequest } from "features/ManageRequest/slice";
import { useDispatch } from "react-redux";

const ApproveRequestForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  function onApprove() {
    dispatch(approveRequest({ requestId: props.requestId })).then(() => {
      form.resetFields();
    });
  }
  function onCancel() {
    dispatch(cancelRequest({ requestId: props.requestId })).then(() => {
      form.resetFields();
    });
  }
  return (
    <>
      <Form form={form}>
        <Form.Item name="Description">
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="Type the description..."
          />
        </Form.Item>
        <Row>
          {!props.IsApproved ? (
            <Col span={4}>
              <Form.Item>
                <Button type="primary" onClick={onApprove}>
                  Approve
                </Button>
              </Form.Item>
            </Col>
          ) : (
            <Col span={4}>
              <Form.Item>
                <Button type="danger" onClick={onCancel}>
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </>
  );
};

export default ApproveRequestForm;
