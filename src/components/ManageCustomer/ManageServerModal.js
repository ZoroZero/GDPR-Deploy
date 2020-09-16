import { Col, Checkbox, Input, Radio, Row, Space, List, Spin, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import "antd/dist/antd.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  getServersCustomer,
  SetServers,
  getOtherServers,
  deleteServersOfCustomer,
  addServersForCustomer,
  setOtherServers,
  setDeletedOwnedServers,
  setAddedServers,
} from "../../features/ManageCustomer/slice";
import { Typography } from "antd";
import { Button, Tooltip, Table } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import InfiniteScroll from "react-infinite-scroller";
const { Title, Text } = Typography;
const { Search } = Input;

const ManageServerModal = (props) => {
  const dispatch = useDispatch();
  const { servers, otherServers, deletedOwnedServers, addedServers } = useSelector(
    (state) => state.customerManagement
  );
  const shouldGetData = props.modalVisible !== false;
  const [option, setOption] = useState({
    status: "available",
  });
  const [page, setPage] = useState(2);
  const [keyword, setKeyword] = useState("");
  const [keyUpdate, setKeyUpdate] = useState(true)

  // const [checkStatus, setCheckStatus] = useState(true)
  useEffect(() => {
    if (shouldGetData) {
      console.log("USE EFFECT MANAGE SERVER", props);
      dispatch(
        setOtherServers({
          data: [],
          hasMore: true,
          loading: false,
        })
      );
      setPage(2);
      setKeyUpdate(!keyUpdate)

      dispatch(getServersCustomer(props.record.Id, ""));
      dispatch(getOtherServers(option, props.record.Id, 1, ""));
    }
  }, [shouldGetData, props.record, option.status]);

  const handleOk = () => {
    if (deletedOwnedServers.length > 0) {
      dispatch(deleteServersOfCustomer(deletedOwnedServers, props.record.Id));

    }
    if (addedServers.length > 0) {
      dispatch(addServersForCustomer(addedServers, props.record.Id));
    }
    props.setModalVisible(false);

  };
  const handleStatusChange = (e) => {
    console.log("HANDLE ON CHANGE STATUS", e.target.value);
    setOption({ status: e.target.value });
  };

  const handleUncheck = (id, value) => {

    if (!value) {
      dispatch(setDeletedOwnedServers(deletedOwnedServers.concat(id)))
    }
    else {
      dispatch(setDeletedOwnedServers(deletedOwnedServers.filter((item) => { return item !== id })))
    }
  }
  const handleCheck = (id, value) => {
    if (value) {
      dispatch(setAddedServers(addedServers.concat(id)))
    }
    else {
      dispatch(setAddedServers(addedServers.filter((item) => { return item !== id })))
    }
  }
  const handleCancel = () => {
    props.setModalVisible(false);
  };
  async function handleInfiniteOnLoad() {
    await setPage(page + 1);
    console.log("ON HANDLE INFINITE", page);
    dispatch(
      setOtherServers({
        ...otherServers,
        loading: true,
      })
    );
    dispatch(getOtherServers(option, props.record.Id, page, keyword));
  }

  async function handleSearchChange(newKeyword) {
    (await newKeyword) ? setKeyword(newKeyword) : setKeyword("");
    dispatch(
      setOtherServers({
        data: [],
        hasMore: true,
        loading: false,
      })
    );
    setPage(2);
    dispatch(getServersCustomer(props.record.Id, newKeyword));
    dispatch(getOtherServers(option, props.record.Id, 1, newKeyword));
  }
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
                <Checkbox key={keyUpdate} defaultChecked={true} onChange={(e) => handleUncheck(record.Id, e.target.checked)} />
              </Row>
            </>
          }
          title={record.Name}
          description={<Text> {record.IpAddress}</Text>}
        />
      ),
    },
  ];

  return (
    <>
      <Modal
        title={
          <Title
            level={4}
            style={{
              color: "Black",
              textAlign: "center",
              borderBottom: "1px solid gray",
              paddingBottom: "20px",
            }}
          >
            Manage Servers of {props.record.FirstName} {props.record.LastName}
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
          <Col span={10} offset={7}>
            <Search
              className="search-bar"
              name="search-content"
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => {
                handleSearchChange(value);
              }}
              autoFocus
            />
          </Col>
          <Radio.Group
            defaultValue="available"
            onChange={handleStatusChange}
            style={{
              width: "30",
              marginTop: "20px",
              marginLeft: "20px",
            }}
          >
            <Radio value="all" style={{ fontSize: "small" }}>
              {" "}
              All{" "}
            </Radio>
            <Radio value="available"> Available </Radio>
          </Radio.Group>
        </Row>

        <Row style={{ border: "1px solid", marginTop: "15px" }}>
          <Col span={12} style={{ padding: "10px" }}>
            <Table
              columns={columnsOwned}
              dataSource={servers}
              pagination={false}
              scroll={{ y: 360 }}
            />
          </Col>
          <Col span={12} style={{ padding: "10px" }}>
            <div style={{ height: "54px", textAlignLast: "center" }}>
              <Text style={{ color: "rgba(0, 0 ,0 ,0.85)", fontWeight: "600" }}>
                {" "}
                Other Servers{" "}
              </Text>
            </div>
            <div className="demo-infinite-container">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={otherServers.hasMore}
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
                                disabled={!record.FirstNameCustomer}
                                key={keyUpdate}
                                defaultChecked={false}
                                onChange={(e) => handleCheck(record.Id, e.target.checked)}
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
