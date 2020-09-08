import React, { useEffect, useState } from "react";
import { Table, Button, Pagination } from "antd";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getListRequests,
  setSortTable,
  setPageSize,
  setCurrentPage,
} from "../../slice";
import Loading from "components/Loading";
import Search from "antd/lib/input/Search";

const columns = [
  {
    title: "Status",
    width: 100,
    dataIndex: "isOpen",
    key: "status",
    fixed: "left",
    render: (data) => (data ? "Open" : "Close"),
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
    width: 250,
    render: (data) => (
      <div>
        <div>Title: {data.Title}</div>
        <div>Description: {data.Description}</div>
      </div>
    ),
  },
  {
    title: "Request From",
    dataIndex: "StartDate",
    key: "request-from",
    width: 150,
    sorter: true,
  },
  {
    title: "Request To",
    dataIndex: "EndDate",
    key: "request-to",
    width: 150,
    sorter: true,
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    render: () => <Button>Detail</Button>,
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
      PageNumber: currentPage,
      PageSize: pageSize,
      SortBy: sortBy,
      SortOrder: sortOrder,
      SearchKey: searchKey,
    }
  ) {
    // console.log(searchKey);
    dispatch(getListRequests({ ...params }));
  }

  function onTableChange(pagination, filters, sorter) {
    dispatch(
      setSortTable({
        sortBy: sorter.field,
        sortOrder: sorter.order !== "ascend",
      })
    );
  }
  function onPageChange(Page, PageSize) {
    dispatch(setCurrentPage({ currentPage: Page }));
  }
  function onPageSizeChange(current, size) {
    // console.log(current, size);
    dispatch(setPageSize({ pageSize: size }));
  }
  function onSearch(value) {
    // console.log(value);
    setSearchKey(value.trim());
  }

  const mergeDataColumn = data.map((val, index) => {
    let title = {
      Title: val.Title,
      Description: val.Description,
    };
    return { ...val, Title: title, key: val.Id };
  });
  return (
    <>
      {loading && <Loading />}
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      />
      <Table
        bordered={true}
        columns={columns}
        dataSource={mergeDataColumn}
        onChange={onTableChange}
        pagination={false}
      />
      <Pagination
        total={totalPage * pageSize}
        current={currentPage}
        pageSize={pageSize}
        onChange={onPageChange}
        showSizeChanger
        onShowSizeChange={onPageSizeChange}
      />
    </>
  );
};

export default MainPage;
