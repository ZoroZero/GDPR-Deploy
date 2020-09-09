import React from "react";
import { Form, Input, DatePicker, TimePicker, Row, Col, Button } from "antd";
import { useDispatch } from "react-redux";
import { onCreateNewRequest } from "features/ManageRequest/slice";

const RequestForm = (props) => {
  const dispatch = useDispatch();

  function onSubmitForm(values) {
    console.log(values);
    console.log(new Date(values.startDate));
    dispatch(onCreateNewRequest(values));
  }
  return (
    <>
      <Form
        name="request-form"
        style={{ paddingTop: "30px" }}
        onFinish={onSubmitForm}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Title(*)"
              rules={[
                {
                  required: true,
                  message: "Please input the title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Form.Item label="From Date" name="startDate">
              <DatePicker showTime />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Form.Item label="To Date" name="endDate">
              <DatePicker showTime />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="server"
              label="Server"
              rules={[
                {
                  required: true,
                  message: "Please input the valid server info!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item name="description" label="Description">
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="center">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default RequestForm;
