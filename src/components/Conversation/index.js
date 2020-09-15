import { Button, Card, Form, Input, Row, Col } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { cloneDeep } from "lodash";
// import socket from "socket/socket";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import socket from "socket/socket";

const ConversationBox = (props) => {
  const [form] = Form.useForm();
  const [lstMsg, setLstMsg] = useState([]);

  // useEffect(() => {

  // }, [lstMsg, props.request.Id]);
  socket.once(props.request.Id, (data) => {
    updateLstMsg(data);
    form.resetFields();
  });

  function updateLstMsg(data) {
    console.log(data);
    setLstMsg([...lstMsg, data]);
  }

  function onSendMessage(val) {
    socket.emit("msgToServer", { ...val, requestId: props.request.Id });
  }

  const lstMsgCard = lstMsg.map((val, index) => {
    return (
      <div key={val.message}>
        <p>
          <strong>{val.user.FirstName}: </strong>
          {val.message}
        </p>
      </div>
    );
  });
  console.log("1");
  return (
    <Card
      title="Conversation"
      bordered={true}
      headStyle={{ backgroundColor: "#339966", color: "white" }}
      bodyStyle={{ height: "500px", border: "1px solid #339966" }}
    >
      {lstMsgCard}
      <Form form={form} onFinish={onSendMessage}>
        <Row>
          <Col span={22}>
            <Form.Item name="message">
              <Input />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Send
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ConversationBox;
