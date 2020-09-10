import React from "react";
import { Input, Form, Button, Row, Col } from "antd";

const ApproveRequestForm = (props) => {
  const [form] = Form.useForm();
  function onSubmit(value) {}
  return (
    <>
      <Form form={form} onFinish={onSubmit}>
        <Form.Item name="Description">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
        <Row>
          <Col span={3}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Approve
              </Button>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item>
              <Button type="danger">Cancel</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ApproveRequestForm;
