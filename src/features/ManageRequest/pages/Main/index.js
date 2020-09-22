import React, { useEffect, useState } from "react";
import { Table, Button, Pagination, Row, Col, Modal, Tag } from "antd";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getListRequests,
  setSortTable,
  setPageSize,
  setCurrentPage,
} from "../../slice";
import Search from "antd/lib/input/Search";
import CreateRequestForm from "components/RequestModal";
import { Link } from "react-router-dom";
import ExportRequestForm from "components/ExportRequestForm";
import { Can } from "permission/can";

const columns = [
  {
    title: "Number",
    width: "5%",
    dataIndex: "Number",
    key: "number",
    fixed: "left",
  },
  {
    title: "Status",
    width: "5%",
    dataIndex: "Status",
    key: "status",
    // fixed: "left",
    filterMultiple: false,
    filters: [
      { text: "pending", value: "pending" },
      { text: "approved", value: "approved" },
      { text: "closed", value: "closed" },
    ],
    render: (data) =>
      !data.IsApproved && !data.IsClosed ? (
        <Tag color="blue">Pending</Tag>
      ) : data.IsClosed ? (
        <Tag>Closed</Tag>
      ) : (
        <Tag color="green">Approved</Tag>
      ),
  },
  {
    title: "Created Date",
    width: "12%",
    dataIndex: "CreatedDate",
    key: "created-date",
    fixed: "left",
    sorter: true,
  },
  {
    title: "Updated Date",
    dataIndex: "UpdatedDate",
    key: "updated-date",
    width: "12%",
    sorter: true,
  },
  {
    title: "Server",
    dataIndex: "Server",
    key: "server",
    width: "10%",
    sorter: true,
  },
  {
    title: "Title",
    dataIndex: "Title",
    key: "title",
    width: "30%",
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
    width: "10%",
    sorter: true,
  },
  {
    title: "Request To",
    dataIndex: "EndDate",
    key: "request-to",
    width: "10%",
    sorter: true,
  },
  {
    title: "Action",
    key: "operation",
    dataIndex: "link",
    width: "6%",
    // fixed: "right",
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
    filterKeys,
  } = useSelector((state) => state.requestManagement);
  const { loading } = useSelector((state) => state.app);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, sortBy, sortOrder, searchKey, filterKeys]);

  console.log(sortBy);
  function fetchData(
    params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      sortColumn: sortBy,
      sortOrder: sortOrder,
      keyword: searchKey,
      filterKeys: filterKeys,
    }
  ) {
    console.log(params);
    dispatch(getListRequests({ ...params }));
  }

  function onTableChange(pagination, filters, sorter) {
    console.log(filters);
    console.log(sorter);
    dispatch(
      setSortTable({
        sortBy: sorter.field ? sorter.field : sortBy,
        sortOrder: sorter.order ? sorter.order : sortOrder,
        filterKeys: filters.status ? filters.status.join(",") : "",
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
    let status = {
      IsApproved: val.IsApproved,
      IsClosed: val.IsClosed,
    };
    return {
      ...val,
      Status: status,
      Title: title,
      key: val.Id,
      link: `/request-management/${val.Id}`,
    };
  });
  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <Can I="export" a="request">
            <Row>
              <Col span={24}>
                <ExportRequestForm />
              </Col>
            </Row>
          </Can>
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
        <Col>
          <p>Total: {data.length > 0 ? data[0].Total : 0} items</p>
        </Col>
        <Col span={10}>
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
