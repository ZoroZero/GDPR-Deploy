import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Card, Row } from "antd";
import ApproveRequestForm from "components/ApproveRequestForm";
import { useDispatch, useSelector } from "react-redux";
import { getRequestDetail } from "features/ManageRequest/slice";
import RequestForm from "components/CreateRequestForm";
import moment from "moment";
import { Can } from "permission/can";

DetailPage.propTypes = {};

function DetailPage(props) {
  const dispatch = useDispatch();
  const requestId = props.match.params.requestId;
  const { requestDetail } = useSelector((state) => state.requestManagement);
  const { loading } = useSelector((state) => state.requestManagement);
  useEffect(() => {
    fetchData(requestId);
  }, []);

  function fetchData(value) {
    dispatch(getRequestDetail(value));
  }

  return (
    <>
      <h2>Request detail page</h2>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Can I="approve-cancel" a="request">
            <Card
              title="Response"
              bordered={true}
              headStyle={{ backgroundColor: "#0066ff", color: "white" }}
            >
              <ApproveRequestForm
                requestId={requestId}
                IsApproved={requestDetail.IsApproved}
              />
            </Card>
          </Can>
          <Card
            title="Update Detail"
            bordered={true}
            headStyle={{ backgroundColor: "#0066ff", color: "white" }}
          >
            <Row>
              <p>
                <strong>Status: </strong>
                {requestDetail.IsApproved ? "Approved" : "Not Approved"}
              </p>
            </Row>
            <Row>
              <p>
                <strong>Created Date: </strong>
                {new Date(requestDetail.CreatedDate).toString()}
              </p>
            </Row>
            <Row>
              <p>
                <strong>Created By: </strong>
                {requestDetail.CreatedBy}
              </p>
            </Row>
            <Row>
              <p>
                <strong>Updated Date: </strong>
                {new Date(requestDetail.UpdatedDate).toString()}
              </p>
            </Row>
            <Row>
              <p>
                <strong>Update By: </strong>
                {requestDetail.UpdatedBy}
              </p>
            </Row>
            <RequestForm request={requestDetail} type="update" />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Conversation"
            bordered={true}
            headStyle={{ backgroundColor: "#339966", color: "white" }}
            bodyStyle={{ height: "500px" }}
          ></Card>
          <Card
            title="Change logs"
            bordered={true}
            headStyle={{ backgroundColor: "#99ccff", color: "white" }}
            bodyStyle={{ height: "300px" }}
          ></Card>
        </Col>
      </Row>
    </>
  );
}

export default DetailPage;
