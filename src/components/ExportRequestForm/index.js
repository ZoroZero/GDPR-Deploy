import { Form, Button, Col, Row, DatePicker, Select } from "antd";
import {
  getListServerOptions,
  getListUserOptions,
  exportRequestByServer,
} from "features/ManageRequest/slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const { Option } = Select;

const ExportRequestForm = (props) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [approverKeyword, setApproverKeyword] = useState("");
  const [requesterKeyword, setRequesterKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const { lstServer } = useSelector((state) => state.requestManagement);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const [form] = Form.useForm();

  function exportToCSV(csvData, fileName) {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  useEffect(() => {
    if (lstServer.length <= 0) dispatch(getListServerOptions());
    getListUserOptions().then((res) => {
      setUserOptions(res.data);
    });
  }, []);

  function onSubmit(value) {
    let fromDate, toDate;
    if (value.fromDate) {
      fromDate = value.fromDate.format("YYYY-MM-DD hh:mm:ss");
    }
    if (value.toDate) {
      toDate = value.toDate.format("YYYY-MM-DD hh:mm:ss");
    }
    dispatch(
      exportRequestByServer({
        ...value,
        fromDate: fromDate,
        toDate: toDate,
      })
    ).then((res) => {
      exportToCSV(res.data, "RequestFile");
      form.resetFields();
    });
  }
  function onSearchRequester(keyword) {
    setRequesterKeyword(keyword);
  }
  function onSearchApprover(keyword) {
    setApproverKeyword(keyword);
  }
  function onSearchServer(keyword) {
    setKeyword(keyword);
  }

  var userOptionsSelection = userOptions
    .filter((val, index) => val.Email.includes(requesterKeyword))
    .map((value, index) => {
      return (
        <Option value={value.Id} key={value.Id}>
          {value.Email}
        </Option>
      );
    });
  var approverOptionsSelection = userOptions
    .filter(
      (val, index) =>
        ["admin", "dc-member"].includes(val.RoleName) &&
        val.Email.includes(approverKeyword)
    )
    .map((value, index) => {
      return (
        <Option value={value.Id} key={value.Id}>
          {value.Email}
        </Option>
      );
    });
  var serverOptions = lstServer
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
      <Button
        onClick={() => setShowForm(!showForm)}
        style={{ width: "300px", marginBottom: "20px" }}
      >
        Export requests by server
      </Button>
      {showForm && (
        <Form
          form={form}
          onFinish={onSubmit}
          style={{ marginTop: "20px" }}
          layout="vertical"
        >
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="From Date" name="fromDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="To Date" name="toDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Requester" name="createdBy">
                <Select
                  showSearch
                  onSearch={onSearchRequester}
                  mode="multiple"
                  allowClear
                >
                  {userOptionsSelection}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Approver" name="approvedBy">
                <Select
                  showSearch
                  onSearch={onSearchApprover}
                  mode="multiple"
                  allowClear
                >
                  {approverOptionsSelection}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Server" name="server">
                <Select
                  showSearch
                  onSearch={onSearchServer}
                  mode="multiple"
                  allowClear
                >
                  {serverOptions}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Export
              </Button>
            </Form.Item>
          </Row>
        </Form>
      )}
    </>
  );
};

export default ExportRequestForm;
