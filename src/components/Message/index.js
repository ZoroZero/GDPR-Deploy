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
            src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
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
          Reply
        </button>
      </article>
    </div>
  );
};

export default Message;
