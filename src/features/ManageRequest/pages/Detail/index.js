import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Card, Row } from "antd";
import ApproveRequestForm from "components/ApproveRequestForm";
import { useDispatch, useSelector } from "react-redux";
import { getRequestDetail } from "features/ManageRequest/slice";
import RequestForm from "components/CreateRequestForm";
import { Can } from "permission/can";
import ChangeLogBox from "components/ChangeLogBox";
import ConversationBox from "components/Conversation";

DetailPage.propTypes = {};

function DetailPage(props) {
  const dispatch = useDispatch();
  const requestId = props.match.params.requestId;
  const { requestDetail, requestLogs } = useSelector(
    (state) => state.requestManagement
  );
  const { userId } = useSelector((state) => state.app);
  useEffect(() => {
    fetchData(requestId);
  }, []);

  function fetchData(value) {
    dispatch(getRequestDetail(value));
  }

  return (
    <>
      <h2>Request #{requestDetail.Number}</h2>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Can I="approve-cancel" a="request">
            <Card
              title="Response"
              bordered={true}
              headStyle={{ backgroundColor: "#0066ff", color: "white" }}
              bodyStyle={{ border: "1px solid #0066ff" }}
            >
              <ApproveRequestForm
                requestId={requestId}
                IsApproved={requestDetail.IsApproved}
                IsClosed={requestDetail.IsClosed}
              />
            </Card>
          </Can>
          <Card
            title="Update Detail"
            bordered={true}
            headStyle={{ backgroundColor: "#0066ff", color: "white" }}
            bodyStyle={{ border: "1px solid #0066ff" }}
          >
            <Row>
              <p>
                <strong>Status: </strong>
                {!requestDetail.IsApproved && !requestDetail.IsClosed
                  ? "Pending"
                  : requestDetail.IsClosed
                  ? "Closed"
                  : "Approved"}
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
                {requestDetail.UpdatedDate
                  ? new Date(requestDetail.UpdatedDate).toString()
                  : ""}
              </p>
            </Row>
            <Row>
              <p>
                <strong>Update By: </strong>
                {requestDetail.UpdatedBy}
              </p>
            </Row>
            <RequestForm
              request={requestDetail}
              type="update"
              disable={
                requestDetail.OwnerId !== userId ||
                requestDetail.IsApproved ||
                requestDetail.IsClosed
              }
            />
          </Card>
        </Col>
        <Col span={12}>
          <ConversationBox />
          <ChangeLogBox logs={requestLogs} />
        </Col>
      </Row>
    </>
  );
}

export default DetailPage;
