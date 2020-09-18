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
  setAddedServers, setServers, setLoading
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
    // loading,
  } = useSelector((state) => state.customerManagement);
  const shouldGetData = props.modalVisible !== false;
  const [option, setOption] = useState({
    status: "available",
  });
  const [page, setPage] = useState(2);
  const [keyword, setKeyword] = useState("");
  const [keyUpdate, setKeyUpdate] = useState(true);
  const [customerStatus, setCustomerStatus] = useState()


  useEffect(() => {
    if (shouldGetData) {
      dispatch(
        setOtherServers({
          data: [],
          hasMore: true,
          loading: false,
        })
      );
      setCustomerStatus(props.record.IsActive);
      setPage(2);

      console.log("set customer status", props.record.IsActive)

      setKeyUpdate(!keyUpdate);


      dispatch(getServersCustomer(props.record.Id, keyword));
      if (props.record.IsActive) dispatch(getOtherServers(option, props.record.Id, 1, keyword));
    }
  }, [shouldGetData, props.record, option.status]);

  const handleOk = () => {

    props.setModalVisible(false);
    dispatch(setServers([]));
    dispatch(setOtherServers([]));
    setKeyword("")
    if (deletedOwnedServers.length > 0) {
      dispatch(deleteServersOfCustomer(deletedOwnedServers, props.record.Id));
    }
    if (addedServers.length > 0) {
      dispatch(addServersForCustomer(addedServers, props.record.Id));
    }
  };

  const handleCancel = () => {
    props.setModalVisible(false);
    dispatch(setServers([]));
    dispatch(setOtherServers([]));

    setKeyword("")
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
    newKeyword = newKeyword.trim()
    dispatch(
      setOtherServers({
        data: [],
        hasMore: true,
        loading: false,
      })
    );
    dispatch(getServersCustomer(props.record.Id, newKeyword));
    if (props.record.IsActive) { dispatch(getOtherServers(option, props.record.Id, 1, newKeyword)); }
    newKeyword ? setKeyword(newKeyword) : setKeyword("");
    setPage(2);
  }

  const columnsOwned = [
    {
      title: servers.length > 0 ? <Text> Owned Servers ({servers.length})</Text> : <Text>Owned Servers (0)</Text>,
      dataIndex: "Id",
      key: "Id",
      align: "center",
      render: (text, record) => (
        <Meta
          style={{ align: "left" }}
          avatar={

            <Checkbox
              key={keyUpdate}
              disabled={!record.IsActive || !customerStatus}
              defaultChecked={true}
              onChange={(e) => handleUncheck(record.Id, e.target.checked)}
            />
          }
          title={record.IsActive ? <Text > {record.Name} </Text> : <Text style={{ color: "darkgrey" }}>{record.Name} (Inactive)</Text>}
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
            <Radio value="all" style={{ fontSize: "small" }} disabled={!customerStatus}>
              All
            </Radio>
            <Radio value="available" disabled={!customerStatus}> Available </Radio>
          </Radio.Group>
        </Row>

        <Row style={{ border: "1px solid", marginTop: "15px" }}>
          <Col span={12} style={{ padding: "10px", textAlignLast: "center" }}>
            {!(servers.length > 0) && <>
              <div style={{ height: "54px" }}>
                <Text style={{ color: "rgba(0, 0 ,0 ,0.85)", fontWeight: "600" }}>
                  {" "}
                Owned Servers ({servers.total})
              </Text>
              </div><Text style={{ color: "green" }}> Has not yet been assigned any server! </Text> </>
            }
            {servers.length > 0 && <Table
              columns={columnsOwned}
              pagination={false}
              dataSource={servers}
              scroll={{ y: 360 }}
            />}
          </Col>
          <Col span={12} style={{ padding: "10px", textAlignLast: "center" }}>
            <div style={{ height: "54px" }}>
              <Text style={{ color: "rgba(0, 0 ,0 ,0.85)", fontWeight: "600" }}>
                {" "}
                Other Servers ({otherServers.total})
              </Text>

            </div>
            {!customerStatus && <Text style={{ color: "red" }}> Please active customer to assign new servers! </Text>}
            <div className="demo-infinite-container">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={otherServers.hasMore}
                useWindow={false}
              >
                {customerStatus &&
                  <List
                    dataSource={otherServers.data}
                    renderItem={(record) => (
                      <List.Item key={record.Id}>
                        <List.Item.Meta
                          avatar={

                            <Checkbox
                              disabled={!record.FirstNameCustomer}
                              key={keyUpdate}
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
                  </List>}
              </InfiniteScroll>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ManageServerModal;
