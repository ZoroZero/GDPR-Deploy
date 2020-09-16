import { Button, Card, Form, Input, Row, Col } from "antd";
import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";

const ConversationBox = (props) => {
  const [form] = Form.useForm();
  const LstMessages = [];
  useEffect(() => {
    const socket = socketIOClient("http://127.0.0.1:5000");
    socket.on("msgToClient", (data) => {
      console.log(data);
      form.resetFields();
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function onSendMessage(val) {
    const socket = socketIOClient("http://127.0.0.1:5000");
    socket.emit("msgToServer", val);
  }
  return (
    <Card
      title="Conversation"
      bordered={true}
      headStyle={{ backgroundColor: "#339966", color: "white" }}
      bodyStyle={{ height: "500px", border: "1px solid #339966" }}
    >
      {LstMessages}
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
