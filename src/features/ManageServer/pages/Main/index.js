import React, { useEffect, useState } from "react";
import { Table, Pagination } from "antd";

// import "./index.scss";

import { listServerApi, getServersApi } from "api/server";
// import { useSelector } from "react-redux";

MainPage.propTypes = {};


const pageSize = 10;



function MainPage() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [loading, setLoading] = useState(false);
    const [total, setTotal ] = useState(0);
    const [sorting, setSorting] = useState(0)
    //   const { startDate } = useSelector((state) => state.userManagement);
    useEffect(() => {
        fetch(1);
        console.log(sorting)
    }, []);

    
    const columns = [
        {
            title: "Server",
            dataIndex: "Name",
            // sorter: true,
            width: "30%",
            onClick: () => {
                console.log(sorting);
                setSorting(sorting ===1?0:1)
                console.log(sorting)
            }
        },
        {
            title: "Ip address",
            dataIndex: "IpAddress",
            width: "12%",
            
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        console.log(sorting);
                        setSorting(sorting ===1?0:1)
                        console.log(sorting);
                    }
                };
            }
        },
        {
            title: "Start Date",
            dataIndex: "StartDate",
            width: "12%",
            sorter: true,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        console.log(sorting);
                        setSorting(sorting ===1?0:1)
                        console.log(sorting);
                    }
                };
            }
        },
        {
            title: "End Date",
            dataIndex: "EndDate",
            sorter: true,
            width: "12%",
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        console.log(sorting);
                        setSorting(sorting ===1?0:1)

                        console.log(sorting);
                    }
                };
            }
        },
        {
            title: "Status",
            dataIndex: "Status",
            width: "12%",
            sorter: true,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        console.log(sorting);
                        setSorting(sorting ===1?0:1)
                        console.log(sorting);
                    }
                };
            }
        },
        {
            title: "Owner",
            dataIndex: "OwnerName",
            width: "12%",
            sorter: true,
            onHeaderCell: (column) => {
                return {
                    onClick:  () => {
                        console.log(sorting);
                        setSorting(sorting ===1?0:1)
                        console.log(sorting);
                    }
                };
            }
        },
    ];

    const handlePageChange = (pageNumber) => {
        // console.log(pageNumber);
        fetch(pageNumber)
    }


    const fetch = (pageNumber) => {
        // console.log("Before", pageNumber)
        setLoading(true);
        return getServersApi({current: pageNumber, pageSize: pageSize}).then((res) => {
            setLoading(false);
            setTotal(res[0].Total)
            setData(res);
        });
        
    };

    return (
        <React.Fragment>
            <Table
                columns={columns}
                rowKey={(record) => record.Id}
                dataSource={data}
                pagination={false}
                loading={loading}
                // onChange={handleTableChange}
            />
            
            <Pagination
                total={total}
                defaultCurrent={1}
                pageSize={pageSize}
                onChange = {handlePageChange}
            />
        </React.Fragment>
    );
}

export default MainPage;
