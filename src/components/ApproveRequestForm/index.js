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
            disabled={props.IsClosed}
          />
        </Form.Item>
        <Row>
          {!props.IsApproved && !props.IsClosed ? (
            <>
              <Col span={4}>
                <Form.Item>
                  <Button type="primary" onClick={onApprove}>
                    Approve Request
                  </Button>
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <Form.Item>
                  <Button type="danger" onClick={onCancel}>
                    Cancel Request
                  </Button>
                </Form.Item>
              </Col>
            </>
          ) : !props.IsClosed ? (
            <Col span={4}>
              <Form.Item>
                <Button type="danger" onClick={onCancel}>
                  Cancel Request
                </Button>
              </Form.Item>
            </Col>
          ) : (
            <Col span={4}>
              <Form.Item>
                <Button type="ghost" disabled>
                  Closed
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
