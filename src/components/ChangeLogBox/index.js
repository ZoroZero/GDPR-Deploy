import { Card, Col, Row } from "antd";
import React from "react";
import "./index.scss";

const ChangeLogBox = (props) => {
  const listCardLogs = props.logs.map((val, index) => {
    return (
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-sm-offset-3">
          <div class="new-message-box">
            <div class="new-message-box-alert">
              <div class="info-tab tip-icon-alert" title="error">
                <i></i>
              </div>
              <div class="tip-box-alert">
                <div class="status-header">
                  <p>{val.UserName} </p>
                  <p> {val.UpdateTime}</p>
                </div>
                <p>{val.StatusChange}</p>
              </div>
            </div>
          </div>
        </div>
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
