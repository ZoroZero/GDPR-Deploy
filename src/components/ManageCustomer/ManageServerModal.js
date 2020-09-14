import { Col, Checkbox, Radio, Row, Space, List, Spin, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import "antd/dist/antd.css";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  getServersCustomer,
  SetServers,
  getOtherServers,
  setOtherServers,
} from "../../features/ManageCustomer/slice";
import { Typography } from "antd";
import { Button, Tooltip, Table } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import InfiniteScroll from "react-infinite-scroller";
const { Title, Text } = Typography;

const ManageServerModal = (props) => {
  const dispatch = useDispatch();
  const { servers, otherServers } = useSelector(
    (state) => state.customerManagement
  );
  const shouldGetData = props.modalVisible !== false;
  const [option, setOption] = useState({
    status: "available",
  });
  let page = 1;
  const pageSize = 10;
  // const [loading,setLoading] = useState(false);
  // const [hasMore,setHasMore] = useState(true);
  useEffect(() => {
    if (shouldGetData) {
      console.log("USE EFFECT MANAGE SERVER", props);
      dispatch(getServersCustomer(props.record.Id));
      dispatch(getOtherServers(option, props.record.Id, 1));
    }
  }, [shouldGetData, props.record]);

  const handleOk = () => {
    props.setModalVisible(false);
  };

  const handleCancel = () => {
    props.setModalVisible(false);
  };
  const handleInfiniteOnLoad = () => {
    page = page + 1;
    console.log("ON HANDLE INFINITE");
    dispatch(
      setOtherServers({
        ...otherServers,
        loading: true,
      })
    );
    dispatch(getOtherServers(option, props.record.Id, page));
  };
  const columnsOwned = [
    {
      title: "Owned Servers",
      dataIndex: "Id",
      key: "Id",
      align: "center",
      filters: [
        {
          text: "InActive",
          value: false,
        },
        {
          text: "Active",
          value: true,
        },
      ],
      onFilter: (value, record) => (value ? record.IsActive : !record.IsActive),

      render: (text, record) => (
        <Meta
          style={{ align: "left" }}
          avatar={
            <>
              <Row>
                {record.IsActive && <Tag color="cyan"> Active</Tag>}
                {!record.IsActive && <Tag color="red"> InActive</Tag>}
              </Row>
              <Row>
                <Checkbox defaultChecked={true} />
              </Row>
            </>
          }
          title={record.Name}
          description={<Text> {record.IpAddress}</Text>}
        />
      ),
    },
  ];

  const columnsOther = [
    {
      title: (
        <>
          <Text style={{ margin: "10px 10px", color: "darkblue" }}>
            Other Servers
          </Text>
          <Radio.Group defaultValue="available" style={{ width: "30" }}>
            <Radio value="all" style={{ fontSize: "small" }}>
              {" "}
              All{" "}
            </Radio>
            <Radio value="available"> Available </Radio>
          </Radio.Group>
        </>
      ),
      dataIndex: "Id",
      key: "Id",
      align: "center",
      filters: [
        {
          text: "InActive",
          value: false,
        },
        {
          text: "Active",
          value: true,
        },
      ],
      defaultFilteredValue: [true],
      onFilter: (value, record) => (value ? record.IsActive : !record.IsActive),

      render: (text, record) => (
        <Meta
          style={{ align: "left" }}
          avatar={
            <>
              <Row>
                {record.IsActive && <Tag color="cyan"> Active</Tag>}
                {!record.IsActive && <Tag color="red"> InActive</Tag>}
              </Row>
              <Row>
                <Checkbox
                  defaultChecked={false}
                  disabled={record.FirstNameCustomer}
                />
              </Row>
            </>
          }
          title={record.Name}
          description={
            <>
              <Text style={{ align: "left" }}>{record.IpAddress}</Text> {"  "}
              {record.FirstNameCustomer ? (
                <Text style={{ color: "blue", align: "right" }}>
                  {" "}
                  {record.FirstNameCustomer} {record.LastNameCustomer}{" "}
                </Text>
              ) : (
                ""
              )}
            </>
          }
        />
      ),
    },
  ];

  return (
    <>
      <Modal
        title={
          <Title level={4} style={{ color: "Blue", textAlign: "center" }}>
            {props.record.FirstName} {props.record.LastName}
          </Title>
        }
        centered
        visible={props.modalVisible}
        forceRender={true}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Row>
          <Col span={12} style={{ padding: "10px" }}>
            <Table
              columns={columnsOwned}
              dataSource={servers}
              pagination={false}
              scroll={{ y: 500 }}
            />

            {/* <Pagination
              pageSizeOptions={pageOptions}
              showTotal={(total) => showTotal(total)}
              showSizeChanger={true}
              showQuickJumper
              defaultCurrent={1}
              current={pagination.current}
              defaultPageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePageChange} */}
            {/* /> */}
          </Col>
          <Col span={12} style={{ padding: "10px" }}>
            {/* <Table
              columns={columnsOther}
              dataSource={otherServers}
              pagination={true}
              scroll={{ y: 500 }}
            /> */}
            <div className="demo-infinite-container">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={true}
                useWindow={false}
              >
                <List
                  dataSource={otherServers.data}
                  renderItem={(record) => (
                    <List.Item key={record.Id}>
                      <List.Item.Meta
                        avatar={
                          <>
                            <Row>
                              {record.IsActive && (
                                <Tag color="cyan"> Active</Tag>
                              )}
                              {!record.IsActive && (
                                <Tag color="red"> InActive</Tag>
                              )}
                            </Row>
                            <Row>
                              <Checkbox
                                defaultChecked={false}
                                disabled={record.FirstNameCustomer}
                              />
                            </Row>
                          </>
                        }
                        title={record.Name}
                        description={
                          <>
                            <Text style={{ align: "left" }}>
                              {record.IpAddress}
                            </Text>{" "}
                            {"  "}
                            {record.FirstNameCustomer ? (
                              <Text style={{ color: "blue", align: "right" }}>
                                {" "}
                                {record.FirstNameCustomer}{" "}
                                {record.LastNameCustomer}{" "}
                              </Text>
                            ) : (
                              ""
                            )}
                          </>
                        }
                      />
                    </List.Item>
                  )}
                >
                  {otherServers.loading && otherServers.hasMore && (
                    <div className="demo-loading-container">
                      <Spin />
                    </div>
                  )}
                </List>
              </InfiniteScroll>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ManageServerModal;
