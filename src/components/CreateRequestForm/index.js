import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Button,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  onCreateNewRequest,
  getListServerOptions,
  onUpdateRequest,
} from "features/ManageRequest/slice";
import moment from "moment";

const { Option } = Select;

const RequestForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { showModal, lstServer } = useSelector(
    (state) => state.requestManagement
  );
  const [keyword, setkeyword] = useState("");

  useEffect(() => {
    form.resetFields();
  }, [showModal]);

  useEffect(() => {
    dispatch(getListServerOptions());
  }, []);

  useEffect(() => {
    if (props.request && props.request.Title) {
      form.setFieldsValue({
        title: props.request.Title,
        startDate: moment(props.request.StartDate),
        endDate: moment(props.request.EndDate),
        server: props.request.ServerName + "-" + props.request.IpAddress,
        description: props.request.Description,
      });
    }
  }, [props.request]);

  function onSubmitForm(values) {
    const data = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD hh:mm:ss"),
      endDate: values.endDate.format("YYYY-MM-DD hh:mm:ss"),
    };
    if (props.type === "update")
      dispatch(onUpdateRequest(data, props.request.Id));
    else dispatch(onCreateNewRequest(data));
  }

  function onSearchServer(value) {
    setkeyword(value);
  }

  const options = lstServer
    .filter((value) => value.Server.includes(keyword))
    .map((value, index) => {
      return (
        <Option value={value.Server} key={value.Server}>
          {value.Server}
        </Option>
      );
    });
  return (
    <>
      <Form
        form={form}
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
            <Form.Item
              label="From Date"
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Please input end date!",
                },
              ]}
            >
              <DatePicker showTime />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Form.Item
              label="To Date"
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Please input end date!",
                },
              ]}
            >
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
              <Select showSearch onSearch={onSearchServer}>
                {options}
              </Select>
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
