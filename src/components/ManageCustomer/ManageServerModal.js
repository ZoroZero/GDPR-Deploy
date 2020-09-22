import {
  Col,
  Checkbox,
  Input,
  Radio,
  Row,
  List,
  Button,
  Spin,
  Typography,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  getServersCustomer,
  getOtherServers,
  deleteServersOfCustomer,
  addServersForCustomer,
  setOtherServers,
  setDeletedOwnedServers,
  setAddedServers,
  setServers,
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
  const [option, setOption] = useState({
    status: "available",
  });
  const [page, setPage] = useState(2);
  const [keyword, setKeyword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [updateKey, setUpdateKey] = useState(false);
  useEffect(() => {
    if (modalVisible) {
      dispatch(getServersCustomer(props.record.Id, keyword));
      if (props.record.IsActive) {
        dispatch(
          setOtherServers({
            data: [],
            loading: true,
            hasMore: true,
            total: 0,
          })
        );
        dispatch(getOtherServers(option, props.record.Id, 1, keyword));
      }
    }
  }, [fetch, option.status]);

  const handleOk = () => {
    setModalVisible(false);
    setTimeout(setUpdateKey(!updateKey), 100);
    dispatch(setServers([]));
    dispatch(setOtherServers([]));
    setKeyword("");
    if (deletedOwnedServers.length > 0) {
      dispatch(deleteServersOfCustomer(deletedOwnedServers, props.record.Id));
    }
    if (addedServers.length > 0) {
      dispatch(addServersForCustomer(addedServers, props.record.Id));
    }
  };

  function handleOpen() {
    return new Promise((rs, rj) => {
      setModalVisible(true);
      rs();
    });
  }

  async function handleClickOpen() {
    setModalVisible(true);
    setTimeout(() => setFetch(!fetch), 100);
  }
  const handleCancel = () => {
    setModalVisible(false);
    setTimeout(setUpdateKey(!updateKey), 100);
    dispatch(
      setServers({
        data: [],
      })
    );
    dispatch(setOtherServers({ data: [] }));

    setKeyword("");
  };

  const handleStatusChange = (e) => {
    setOption({ status: e.target.value });
  };

  const handleUncheck = (id, value) => {
    setTimeout(() => {
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
    }, 100);
  };

  const handleCheck = (id, value) => {
    setTimeout(() => {
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
    }, 100);
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
    newKeyword = newKeyword.trim();
    dispatch(
      setOtherServers({
        data: [],
        hasMore: true,
        loading: false,
      })
    );
    dispatch(getServersCustomer(props.record.Id, newKeyword));
    if (props.record.IsActive) {
      dispatch(getOtherServers(option, props.record.Id, 1, newKeyword));
    }
    newKeyword ? setKeyword(newKeyword) : setKeyword("");
    setPage(2);
  }

  return (
    <>
      <Button onClick={handleClickOpen}>
        Manage {props.totalServers ? props.totalServers : 0}
      </Button>
      <Modal
        centered
        visible={modalVisible}
        forceRender={false}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Row>
          <Col span={10} offset={7}>
            <Search
              key={updateKey}
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
            <Radio
              value="all"
              style={{ fontSize: "small" }}
              disabled={!props.record.IsActive}
            >
              All
            </Radio>
            <Radio value="available" disabled={!props.record.IsActive}>
              {" "}
              Available{" "}
            </Radio>
          </Radio.Group>
        </Row>

        <Row style={{ border: "1px solid", marginTop: "15px" }}>
          <Col span={12} style={{ padding: "10px", textAlignLast: "center" }}>
            <div style={{ height: "54px" }}>
              <h3 style={{ marginTop: "7px" }}>
                {" "}
                Owned Servers ({servers.total})
              </h3>
            </div>
            <div className="demo-infinite-container">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                hasMore={otherServers.hasMore}
                useWindow={false}
              >
                {servers.loading && <Spin />}

                {!servers.loading && servers.total > 0 && (
                  <List
                    dataSource={servers.data}
                    renderItem={(record) => (
                      <List.Item key={record.Id}>
                        <List.Item.Meta
                          avatar={
                            <Checkbox
                              disabled={
                                !record.IsActive || !props.record.IsActive
                              }
                              defaultChecked={true}
                              onChange={(e) =>
                                handleUncheck(record.Id, e.target.checked)
                              }
                            />
                          }
                          title={
                            record.IsActive ? (
                              <Text> {record.Name} </Text>
                            ) : (
                              <Text style={{ color: "darkgrey" }}>
                                {record.Name} (Inactive)
                              </Text>
                            )
                          }
                          description={<Text> {record.IpAddress}</Text>}
                        />
                      </List.Item>
                    )}
                  ></List>
                )}
              </InfiniteScroll>
            </div>
          </Col>
          <Col span={12} style={{ padding: "10px", textAlignLast: "center" }}>
            <div style={{ height: "54px" }}>
              <h3 style={{ marginTop: "7px" }}>
                Other Servers ({otherServers.total})
              </h3>
            </div>

            <div className="demo-infinite-container">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={otherServers.hasMore}
                useWindow={false}
              >
                {!props.record.IsActive && (
                  <Text style={{ color: "red" }}>
                    {" "}
                    Please active customer to assign new servers!{" "}
                  </Text>
                )}
                {props.record.IsActive &&
                  otherServers.loading &&
                  otherServers.total < 1 && <Spin />}
                {props.record.IsActive && otherServers.total > 0 && (
                  <List
                    dataSource={otherServers.data}
                    renderItem={(record) => (
                      <List.Item key={record.Id}>
                        <List.Item.Meta
                          avatar={
                            <Checkbox
                              disabled={!record.FirstNameCustomer}
                              defaultChecked={false}
                              onChange={(e) =>
                                handleCheck(record.Id, e.target.checked)
                              }
                              disabled={record.FirstNameCustomer}
                            />
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
                )}
              </InfiniteScroll>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ManageServerModal;
