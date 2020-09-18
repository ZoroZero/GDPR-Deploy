import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { getRepliedMsgApi } from "api/requests";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Message = (props) => {
  const { userId } = useSelector((state) => state.app);
  const val = props.msg;
  const [repliedMsg, setRepliedMsg] = useState(null);

  useEffect(() => {
    if (val.ReplyId) {
      fetchRepliedMsg(val.ReplyId);
    }
  }, [val.ReplyId]);

  function fetchRepliedMsg(ReplyId) {
    getRepliedMsgApi(ReplyId).then((res) => {
      setRepliedMsg(res.data);
    });
  }

  let replyMsg = null;
  if (repliedMsg)
    replyMsg = (
      <div className="flr">
        {/* <span className={ val.User.Id === userId ?"msg-right": "msg"}>Reply to</span> */}
        <span className="timestamp">
          <span>Reply to: </span>
          <span className="username">{repliedMsg.FirstName}</span>&bull;
          <span className="posttime">{repliedMsg.CreatedDate}</span>
        </span>
        <div className="messages">
          <p className={val.User.Id === userId ? "msg-right" : "msg"}>
            {repliedMsg.Content}
          </p>
        </div>
      </div>
    );
  function setReplyToMsg() {
    if (repliedMsg) {
      props.setReplyToMsg(repliedMsg);
    } else {
      props.setReplyToMsg({
        Id: val.Id,
        CreatedDate: val.CreatedDate,
        FirstName: val.User.FirstName,
        Content: val.Content,
        Avatar: val.Avatar,
      });
    }
  }

  return (
    <div>
      <article
        className={`msg-container ${
          val.User.Id === userId ? "msg-self" : "msg-remote"
        }`}
      >
        {replyMsg}
        <div className="msg-box">
          <img
            className="user-img"
            src={`${process.env.REACT_APP_BASE_URL}/api/users/thumbnails/${val.Avatar}`}
          />
          <div className="flr">
            <span className="timestamp">
              <span className="username">{val.User.FirstName}</span>&bull;
              <span className="posttime">{val.CreatedDate}</span>
            </span>
            <div className="messages">
              <p className="msg">{val.Content}</p>
            </div>
          </div>
        </div>
        <button className="reply-btn" onClick={setReplyToMsg}>
          <FontAwesomeIcon icon={faReply} />
        </button>
      </article>
    </div>
  );
};

export default Message;
