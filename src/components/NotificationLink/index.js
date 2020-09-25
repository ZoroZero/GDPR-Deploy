import { onReadNotification } from "features/App/slice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const NotificationLink = (props) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   readNotification(props.id);
  // }, [props.id]);
  function readNotification(id) {
    dispatch(onReadNotification(id));
  }
  return (
    <Link to={props.link} onClick={() => readNotification(props.id)}>
      {props.content}
    </Link>
  );
};

export default NotificationLink;
