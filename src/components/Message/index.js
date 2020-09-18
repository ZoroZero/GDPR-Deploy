import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { getRepliedMsgApi } from "api/requests";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Message = (props) => {
  const ref = useRef(null);
  const { userId } = useSelector((state) => state.app);
  const val = props.msg;
  const [repliedMsg, setRepliedMsg] = useState(null);

  // useEffect(() => {
  //   if (val.ReplyId) {
  //     fetchRepliedMsg(val.ReplyId);
  //   }
  // }, [val.ReplyId]);

  // function fetchRepliedMsg(ReplyId) {
  //   getRepliedMsgApi(ReplyId).then((res) => {
  //     setRepliedMsg(res.data);
  //   });
  // }

  useEffect(() => {
    if (props.focus) {
      ref.current.focus();
    }
  }, [props.focus]);

  let replyMsg = null;
  if (
    val.ReplyMsg &&
    val.ReplyMsg.Id &&
    val.ReplyMsg.User &&
    val.ReplyMsg.User.Id
  )
    replyMsg = (
      <div className="flr">
        <span className="timestamp">
          <span>Reply to: </span>
          <span className="username">{val.ReplyMsg.User.FirstName}</span>&bull;
          <span className="posttime">{val.ReplyMsg.CreatedDate}</span>
        </span>
        <div className="messages">
          <p className={val.User.Id === userId ? "msg-right" : "msg"}>
            {val.ReplyMsg.Content}
          </p>
        </div>
      </div>
    );
  function setReplyToMsg() {
    if (val.ReplyMsg && val.ReplyMsg.Id) {
      props.setReplyToMsg(val.ReplyMsg);
    } else {
      props.setReplyToMsg({
        Id: val.Id,
        CreatedDate: val.CreatedDate,
        User: { FirstName: val.User.FirstName, Id: val.User.Id },
        Content: val.Content,
        Avatar: val.Avatar,
      });
    }
  }

  return (
    <div ref={ref}>
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

function areEqual(prevProps, nextProps) {
  return (
    prevProps.msg.Id === nextProps.msg.Id &&
    prevProps.msg.ReplyId === nextProps.msg.ReplyId &&
    prevProps.focus === nextProps.focus
  );
}

export default React.memo(Message, areEqual);
