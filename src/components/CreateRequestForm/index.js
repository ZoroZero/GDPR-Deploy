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

  const disable = props.disable && props.type !== "new";
  return (
    <>
      <Form
        form={form}
        name="request-form"
        style={{ paddingTop: "30px" }}
        onFinish={onSubmitForm}
        layout="vertical"
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
              <Input disabled={disable} style={{ fontWeight: "bold" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
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
              <DatePicker
                showTime
                disabled={disable}
                style={{ width: "100%", fontWeight: "bold" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
              <DatePicker
                showTime
                disabled={disable}
                style={{ width: "100%", fontWeight: "bold" }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* <Row gutter={[16, 16]}>
          
        </Row> */}
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
              <Select
                showSearch
                onSearch={onSearchServer}
                disabled={disable}
                style={{ fontWeight: "bold" }}
              >
                {options}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input some description!",
                },
              ]}
            >
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                disabled={disable}
                style={{ fontWeight: "bold" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="center">
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={disable}>
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default RequestForm;
