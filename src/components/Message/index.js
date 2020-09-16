import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Message = (props) => {
  const { userId } = useSelector((state) => state.app);
  const val = props.msg;

  // useEffect(() => {
  //   fetchMsgReplied(props.msg.ReplyId);
  // }, [props.msg.ReplyId]);

  // function fetchMsgReplied(msgReplyId){
  //   getRepliedMsgApi(msgReplyId)
  //   .then(()=>{

  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  // }

  return (
    <div>
      <article
        className={`msg-container ${
          val.User.Id === userId ? "msg-self" : "msg-remote"
        }`}
      >
        {/* {replyToMessage} */}
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
      </article>
    </div>
  );
};

export default Message;
