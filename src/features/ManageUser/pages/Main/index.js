import React, { useEffect, useState } from "react";
import { Table } from "antd";

import "./index.scss";

import { getUsersApi } from "api/user";
import { useSelector } from "react-redux";

MainPage.propTypes = {};

const getRandomuserParams = (params) => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

function MainPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const { startDate } = useSelector((state) => state.userManagement);
  useEffect(() => {
    fetch({ pagination });
  }, []);

  const handleTableChange = (tablePagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: tablePagination,
      ...filters,
    });
  };

  const fetch = (params = {}) => {
    setLoading(true);
    return getUsersApi(getRandomuserParams(params)).then((res) => {
      setLoading(false);
      setData(res.results);
      setPagination({
        ...params.pagination,
        total: 200,
      });
    });
  };

  return (
    <div>
      <Table
        columns={columns}
        rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default MainPage;
