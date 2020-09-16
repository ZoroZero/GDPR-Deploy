import { Card, Col, Row } from "antd";
import React from "react";

const ChangeLogBox = (props) => {
  const listCardLogs = props.logs.map((val, index) => {
    return (
      <div
        key={val.Id}
        style={{ border: "1px solid #99ccff", backgroundColor: "white" }}
      >
        <Row gutter={[0, 0]}>
          <Col span={12}>
            <p>
              <strong>{val.UserName}</strong>
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>{val.UpdateTime}</strong>
            </p>
          </Col>
        </Row>
        <Row>
          <p>{val.StatusChange}</p>
        </Row>
      </div>
    );
  });
  return (
    <Card
      title="Change logs"
      bordered={true}
      headStyle={{ backgroundColor: "#99ccff", color: "white" }}
      bodyStyle={{
        height: "450px",
        overflowY: "auto",
        backgroundColor: "#E7EBF0",
        border: "1px solid #99ccff",
      }}
    >
      {listCardLogs}
    </Card>
  );
};
export default ChangeLogBox;
