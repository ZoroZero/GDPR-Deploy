import React, { useEffect, useState, useCallback } from "react";
import { Table, Pagination, Input, Button  } from "antd";
import "./index.scss";
import { getServersApi } from "api/server";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "features/ManageServer/slice";
import AddEditServerModal from "components/ManageServer/AddEditServerModal"; 
import { SERVER_CONSTANTS } from 'constants/ManageServer/server';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [editRequest, setEditRequest] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const setRefreshPage = useCallback(() => {
        setRefresh(refresh => !refresh);
      }, []);

    useEffect(() => {
        fetch(page, sortColumn, sortOrder, searchKeyword);
    }, [sortColumn, sortOrder, searchKeyword, refresh]);


    useEffect(() => {
        handleModalActivate()
        // console.log(serverEdit)
    }, [editRequest]);

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
            width: "10%",
            sorter: true,
        },
        {
            title: "Start Date",
            dataIndex: "StartDate",
            width: "10%",
            sorter: true,
        },
        {
            title: "End Date",
            dataIndex: "EndDate",
            sorter: true,
            width: "10%",
        },
        {
            title: "Status",
            dataIndex: "Status",
            width: "10%",
            sorter: true,
        },
        {
            title: "Owner",
            dataIndex: "OwnerName",
            width: "10%",
            sorter: true,
        },
        {
            title: 'Edit',
            key: 'operation',
            width: "10%",
            render: (record) => <Button onClick={() => {setEditRequest({
                                                            type: SERVER_CONSTANTS.UPDATE_SERVER_TYPE, 
                                                            data: record})}}>Edit</Button>,
          },
          {
            title: 'Delete',
            key: 'operation',
            width: "10%",
            render: (record) => <Button onClick={() => {handleDeleteServer(record.Id)} }>Delete</Button>,
          }
    ];
    
    // Handle change in page number
    const handlePageChange = (pageNumber) => {
        // console.log(pageNumber);
        setPage(pageNumber)
        console.log("Fetch after pagination change");
        fetch(pageNumber, sortColumn, sortOrder, searchKeyword)
    }

    // Fetch data
    const fetch = (pageNumber, sortColumn, sortOrder, keyword) => {
        // console.log("Before", pageNumber)
        setLoading(true);
        // console.log('Fetch normal');
        return getServersApi({
                            current: pageNumber, 
                            pageSize: pageSize, 
                            sortColumn: sortColumn,
                            sortOrder: sortOrder,
                            keyword: keyword}).then((res) => {
            setLoading(false);
            console.log(res.data)
            setTotal(res.data[0]?res.data[0].Total: 0)
            setData(res.data);
        }).catch((err) => {console.log(err)});
    };

    // Handle sorting
    function handleSortChange(pagination, filters, sorter) {
        // console.log('params', sorter);
        var newSortColumn = sorter.column? sorter.column.dataIndex: 'Name'
        var newSortOrder = sorter.order ==='descend'?'descend':'ascend'
        dispatch(setSort({sortColumn: newSortColumn, sortOrder: newSortOrder }));
        // console.log("Fetch after sort change");
        // fetch(page, newSortColumn, newSortOrder, searchKeyword);
    }

    //Handle search 
    function handleSearchServer(keyword){
        setSearchKeyword(keyword)
        // console.log("Fetch after search");
        // fetch(1, sortColumn, sortOrder, keyword)
    }

    // Handle on edit click
    function handleModalActivate(){
        if(editRequest){
            setModalVisible(true)
        }
    }

    // Handle delete server
    function handleDeleteServer(id){
        console.log("Delete", id);
    }

    return (
        <React.Fragment>
            <Button type="primary" onClick={()=> setEditRequest(SERVER_CONSTANTS.ADD_SERVER_REQUEST)}>
                Create new server
            </Button>

            <AddEditServerModal request={editRequest} modalVisible={modalVisible} 
            setModalVisible={setModalVisible} setEditRequest={setEditRequest} setRefreshPage={setRefreshPage}></AddEditServerModal>


            <Search className="search-bar"
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => handleSearchServer(value.trim())}
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
