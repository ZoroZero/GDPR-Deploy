import { Button, Card, Form, Input, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "socket/socket";
import { getAllMessageApi } from "api/requests";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Message from "components/Message";

const ConversationBox = (props) => {
  const [form] = Form.useForm();
  const [lstMsg, setLstMsg] = useState([]);
  const [replyToMsg, setReplyToMsg] = useState(null);
  const { token, userId, avatar } = useSelector((state) => state.app);

  useEffect(() => {
    if (props.request.Id) fetchOldMessage(props.request.Id);
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
    updateLstMsg(data);
    form.resetFields();
  });

  function fetchOldMessage(requestId) {
    getAllMessageApi(requestId)
      .then((res) => {
        setLstMsg(res.data.reverse());
      })
      .catch((error) => {});
  }
  function updateLstMsg(data) {
    setLstMsg([data, ...lstMsg]);
  }

  function onSendMessage(val) {
    socket.emit("msgToServer", {
      ...val,
      requestId: props.request.Id,
      ReplyId: replyToMsg ? replyToMsg.Id : null,
      ReplyMsg: replyToMsg,
      avatar: avatar,
      headers: {
        Authorization: token,
      },
    });
  }

  function setReplytoMsg(msg) {
    setReplyToMsg(msg);
  }

  const lstMsgCard = lstMsg.map((val, index) => {
    return (
      <Message
        msg={val}
        key={val.Id}
        setReplyToMsg={setReplyToMsg}
        focus={index === lstMsg.length - 1}
      />
    );
  });

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
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {lstMsgCard}
      </Card>
      {replyToMsg && (
        <article className={`msg-container msg-remote`}>
          <div className="msg-box">
            <img
              className="user-img"
              src={`${process.env.REACT_APP_BASE_URL}/api/users/thumbnails/${replyToMsg.Avatar}`}
            />
            <div className="flr">
              <span className="timestamp">
                <span className="username">{replyToMsg.User.FirstName}</span>
                &bull;
                <span className="posttime">{replyToMsg.CreatedDate}</span>
              </span>
              <div className="messages">
                <p className="msg">{replyToMsg.Content}</p>
              </div>
            </div>
          </div>
          <button className="reply-btn" onClick={() => setReplyToMsg(null)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </article>
      )}
      <Form form={form} onFinish={onSendMessage}>
        <Row>
          <Col span={22}>
            <Form.Item name="message">
              <Input autoFocus />
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
