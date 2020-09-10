import React from "react";
import PropTypes from "prop-types";
import { Col, Card, Row } from "antd";
import ApproveRequestForm from "components/ApproveRequestForm";

DetailPage.propTypes = {};

function DetailPage(props) {
  return (
    <>
      <h2>Request detail page</h2>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title="Response"
            bordered={true}
            headStyle={{ backgroundColor: "#0066ff", color: "white" }}
          >
            <ApproveRequestForm />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Conversation"
            bordered={true}
            headStyle={{ backgroundColor: "#339966", color: "white" }}
          ></Card>
        </Col>
      </Row>
    </>
  );
}

export default DetailPage;
