import React, { useEffect, useState } from "react";
import { Table, Button, Pagination, Row, Col, Modal } from "antd";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getListRequests,
  setSortTable,
  setPageSize,
  setCurrentPage,
  setModal,
} from "../../slice";
import Loading from "components/Loading";
import Search from "antd/lib/input/Search";
import CreateRequestForm from "components/RequestModal";
import { Link } from "react-router-dom";
import moment from "moment";

const columns = [
  {
    title: "Status",
    width: 100,
    dataIndex: "IsApproved",
    key: "status",
    fixed: "left",
    render: (data) => (data ? "Approved" : "Not approved"),
  },
  {
    title: "Created Date",
    width: 200,
    dataIndex: "CreatedDate",
    key: "created-date",
    fixed: "left",
    sorter: true,
  },
  {
    title: "Updated Date",
    dataIndex: "UpdatedDate",
    key: "updated-date",
    width: 200,
    sorter: true,
  },
  {
    title: "Server",
    dataIndex: "Server",
    key: "server",
    width: 150,
    sorter: true,
  },
  {
    title: "Title",
    dataIndex: "Title",
    key: "title",
    width: 300,
    render: (data) => (
      <div>
        <div>
          <strong>Title: </strong>
          {data.Title}
        </div>
        <div>
          <strong>Description: </strong>
          {data.Description}
        </div>
      </div>
    ),
  },
  {
    title: "Request From",
    dataIndex: "StartDate",
    key: "request-from",
    width: 120,
    sorter: true,
  },
  {
    title: "Request To",
    dataIndex: "EndDate",
    key: "request-to",
    width: 120,
    sorter: true,
  },
  {
    title: "Action",
    key: "operation",
    dataIndex: "link",
    fixed: "right",
    render: (data) => (
      <Link to={data}>
        <Button>Detail</Button>
      </Link>
    ),
  },
];

const MainPage = (props) => {
  const dispatch = useDispatch();
  const {
    data,
    currentPage,
    totalPage,
    pageSize,
    sortBy,
    sortOrder,
  } = useSelector((state) => state.requestManagement);
  const { loading } = useSelector((state) => state.app);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, sortBy, sortOrder, searchKey]);

  function fetchData(
    params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      sortColumn: sortBy,
      sortOrder: sortOrder,
      keyword: searchKey,
    }
  ) {
    dispatch(getListRequests({ ...params }));
  }

  function onTableChange(pagination, filters, sorter) {
    dispatch(
      setSortTable({
        sortBy: sorter.field,
        sortOrder: sorter.order,
      })
    );
  }
  function onPageChange(Page, PageSize) {
    dispatch(setCurrentPage({ currentPage: Page }));
  }
  function onPageSizeChange(current, size) {
    dispatch(setPageSize({ pageSize: size }));
  }
  function onSearch(value) {
    setSearchKey(value.trim());
  }

  const mergeDataColumn = data.map((val, index) => {
    let title = {
      Title: val.Title,
      Description: val.Description,
    };
    return {
      ...val,
      Title: title,
      key: val.Id,
      link: `/request-management/${val.Id}`,
    };
  });
  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Row justify="space-between" gutter={[16, 16]}>
            <Col span={6}>
              <CreateRequestForm />
            </Col>
            <Col span={6}>
              <Search placeholder="input search text" onSearch={onSearch} />
            </Col>
          </Row>
          <Table
            bordered={true}
            columns={columns}
            dataSource={mergeDataColumn}
            onChange={onTableChange}
            pagination={false}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col span={12} offset={6}>
          <Pagination
            total={totalPage * pageSize}
            current={currentPage}
            pageSize={pageSize}
            onChange={onPageChange}
            showSizeChanger
            onShowSizeChange={onPageSizeChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default MainPage;