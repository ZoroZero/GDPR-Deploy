import React, { useEffect, useState } from "react";
import { Table, Pagination, Input  } from "antd";
import "./index.scss";
import { getServersApi } from "api/server";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "features/ManageServer/slice";

MainPage.propTypes = {};

const pageSize = 10;
const { Search } = Input

function MainPage() {
    const dispatch = useDispatch()
    const {sortColumn, sortOrder} = useSelector((state) => state.serverManagement)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal ] = useState(0);
    const [page, setPage ] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');    
    useEffect(() => {
        fetch(1, sortColumn, sortOrder, searchKeyword);
    }, []);

    // Table columns
    const columns = [
        {
            title: "Server",
            dataIndex: "Name",
            width: "30%",
            sorter: true,
        },
        {
            title: "Ip address",
            dataIndex: "IpAddress",
            width: "12%",
            sorter: true,
        },
        {
            title: "Start Date",
            dataIndex: "StartDate",
            width: "12%",
            sorter: true,
        },
        {
            title: "End Date",
            dataIndex: "EndDate",
            sorter: true,
            width: "12%",
        },
        {
            title: "Status",
            dataIndex: "Status",
            width: "12%",
            sorter: true,
        },
        {
            title: "Owner",
            dataIndex: "OwnerName",
            width: "12%",
            sorter: true,
        },
    ];
    
    // Handle change in page number
    const handlePageChange = (pageNumber) => {
        // console.log(pageNumber);
        setPage(pageNumber)
        fetch(pageNumber, sortColumn, sortOrder, searchKeyword)
    }

    // Fetch data
    const fetch = (pageNumber, sortColumn, sortOrder, keyword) => {
        // console.log("Before", pageNumber)
        setLoading(true);
        console.log("Sort column", sortColumn);
        console.log("Sort order", sortOrder);
        return getServersApi({
                            current: pageNumber, 
                            pageSize: pageSize, 
                            sortColumn: sortColumn,
                            sortOrder: sortOrder,
                            keyword: keyword}).then((res) => {
            setLoading(false);
            console.log(res)
            setTotal(res[0]?res[0].Total: 0)
            setData(res);
        });
        
    };

    // Handle sorting
    async function handleSortChange(pagination, filters, sorter) {
        // console.log('params', sorter);
        var newSortColumn = sorter.column? sorter.column.dataIndex: 'Name'
        var newSortOrder = sorter.order ==='descend'?'descend':'ascend'
        await dispatch(setSort({sortColumn: newSortColumn, sortOrder: newSortOrder }));
        fetch(page, newSortColumn, newSortOrder, searchKeyword);
        // console.log("Sort column", sortColumn);
        // console.log("Sort order", sortOrder);
    }

    //Handle search 
    function handleSearchServer(keyword){
        setSearchKeyword(keyword)
        fetch(1, sortColumn, sortOrder, keyword)
    }

    return (
        <React.Fragment>
            <Search className="search-bar"
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={value => handleSearchServer(value)}
            />

            <Table
                columns={columns}
                rowKey={(record) => record.Id}
                dataSource={data}
                pagination={false}
                loading={loading}
                onChange={handleSortChange}
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
