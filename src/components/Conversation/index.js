import { Button, Card, Form, Input, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "socket/socket";
import { getAllMessageApi } from "api/requests";
import "./index.scss";
import InfinteScrollReverse from "react-infinite-scroll-reverse";
import Message from "components/Message";

const ConversationBox = (props) => {
  const [form] = Form.useForm();
  const [lstMsg, setLstMsg] = useState([]);
  const { token, userId } = useSelector((state) => state.app);

  useEffect(() => {
    fetchOldMessage(props.request.Id);
  }, [props.request.Id]);

  useEffect(() => {
    socket.emit("joinRoom", {
      requestId: props.request.Id,
      headers: {
        Authorization: token,
      },
    });
    return () => {
      socket.emit("leaveRoom", {
        requestId: props.request.Id,
        headers: {
          Authorization: token,
        },
      });
    };
  }, [props.request.Id]);

  socket.once(props.request.Id, (data) => {
    console.log("Hello");
    updateLstMsg(data);
    form.resetFields();
  });

  function fetchOldMessage(requestId) {
    getAllMessageApi(requestId)
      .then((res) => {
        console.log(res);
        setLstMsg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function updateLstMsg(data) {
    console.log(data);
    setLstMsg([...lstMsg, data]);
  }

  function onSendMessage(val) {
    socket.emit("msgToServer", {
      ...val,
      requestId: props.request.Id,
      headers: {
        Authorization: token,
      },
    });
  }

  const lstMsgCard = lstMsg.map((val, index) => {
    return <Message msg={val} key={val.Id} />;
  });

  function getItems() {}

  return (
    <>
      <Card
        title="Conversation"
        bordered={true}
        headStyle={{ backgroundColor: "#339966", color: "white" }}
        bodyStyle={{
          height: "500px",
          border: "1px solid #339966",
          overflowY: "auto",
        }}
      >
        {lstMsgCard}
      </Card>
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
    </>
  );
};

export default ConversationBox;