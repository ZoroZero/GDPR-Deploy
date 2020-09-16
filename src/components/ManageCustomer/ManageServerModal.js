import { Col, Checkbox, Input, Radio, Row, List, Spin, Tag, Typography, Table, Modal } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getServersCustomer,
  getOtherServers,
  deleteServersOfCustomer,
  addServersForCustomer,
  setOtherServers,
  setDeletedOwnedServers,
  setAddedServers,
} from "../../features/ManageCustomer/slice";
import InfiniteScroll from "react-infinite-scroller";

const { Title, Text } = Typography;
const { Search } = Input;

const ManageServerModal = (props) => {
  const dispatch = useDispatch();
  const {
    servers,
    otherServers,
    deletedOwnedServers,
    addedServers,
  } = useSelector((state) => state.customerManagement);
  const shouldGetData = props.modalVisible !== false;
  const [option, setOption] = useState({
    status: "available",
  });
  const [page, setPage] = useState(2);
  const [keyword, setKeyword] = useState("");
  const [keyUpdate, setKeyUpdate] = useState(true);

  useEffect(() => {
    if (shouldGetData) {
      dispatch(
        setOtherServers({
          data: [],
          hasMore: true,
          loading: false,
        })
      );
      setPage(2);
      setKeyUpdate(!keyUpdate);
      dispatch(getServersCustomer(props.record.Id, ""));
      dispatch(getOtherServers(option, props.record.Id, 1, ""));
    }
  }, [shouldGetData, props.record, option.status]);

  const handleOk = () => {
    props.setModalVisible(false);
    if (deletedOwnedServers.length > 0) {
      dispatch(deleteServersOfCustomer(deletedOwnedServers, props.record.Id));
    }
    if (addedServers.length > 0) {
      dispatch(addServersForCustomer(addedServers, props.record.Id));
    }
  };

  const handleCancel = () => {
    props.setModalVisible(false);
  };

  const handleStatusChange = (e) => {
    setOption({ status: e.target.value });
  };

  const handleUncheck = (id, value) => {
    if (!value) {
      dispatch(setDeletedOwnedServers(deletedOwnedServers.concat(id)));
    } else {
      dispatch(
        setDeletedOwnedServers(
          deletedOwnedServers.filter((item) => {
            return item !== id;
          })
        )
      );
    }
  };

  const handleCheck = (id, value) => {
    if (value) {
      dispatch(setAddedServers(addedServers.concat(id)));
    } else {
      dispatch(
        setAddedServers(
          addedServers.filter((item) => {
            return item !== id;
          })
        )
      );
    }
  };

  async function handleInfiniteOnLoad() {
    dispatch(
      setOtherServers({
        ...otherServers,
        loading: true,
      })
    );
    dispatch(getOtherServers(option, props.record.Id, page + 1, keyword));
    setPage(page + 1);
  }

  async function handleSearchChange(newKeyword) {
    dispatch(
      setOtherServers({
        data: [],
        hasMore: true,
        loading: false,
      })
    );
    dispatch(getServersCustomer(props.record.Id, newKeyword));
    dispatch(getOtherServers(option, props.record.Id, 1, newKeyword));
    newKeyword ? setKeyword(newKeyword) : setKeyword("");
    setPage(2);
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
                <Checkbox
                  key={keyUpdate}
                  defaultChecked={true}
                  onChange={(e) => handleUncheck(record.Id, e.target.checked)}
                />
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
              placeholder="search any server"
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
              All
            </Radio>
            <Radio value="available"> Available </Radio>
          </Radio.Group>
        </Row>

        <Row style={{ border: "1px solid", marginTop: "15px" }}>
          <Col span={12} style={{ padding: "10px" }}>
            <Table
              columns={columnsOwned}
              dataSource={servers}
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
                loadMore={handleInfiniteOnLoad}
                hasMore={otherServers.hasMore}
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
                                onChange={(e) =>
                                  handleCheck(record.Id, e.target.checked)
                                }
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
                            {record.FirstNameCustomer ? (
                              <Text style={{ color: "blue", align: "right" }}>
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
