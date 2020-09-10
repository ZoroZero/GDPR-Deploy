import React, { useEffect, useState, useCallback } from "react";
import { Table, Pagination, Input, Button, Modal, Tag, Collapse } from "antd";
import "./index.scss";
import { getServersApi, deleteServerApi } from "api/server";
import { useDispatch, useSelector } from "react-redux";
import { setSort, setData, setPagination } from "features/ManageServer/slice";
import AddEditServerModal from "components/ManageServer/AddEditServerModal"; 
import { SERVER_CONSTANTS } from 'constants/ManageServer/server';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ExportServer from 'components/ManageServer/ExportServer';

MainPage.propTypes = {};

const { Search } = Input
const { confirm } = Modal;


function MainPage() {
    const dispatch = useDispatch()

    const {sortColumn, sortOrder, data, pagination} = useSelector((state) => state.serverManagement)
    // const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [total, setTotal ] = useState(0);

    // const [page, setPage ] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');  

    const [filter, setFilter] = useState({filterColumn: SERVER_CONSTANTS.DEFAULT_FILTER_COLUMN, filterKeys: SERVER_CONSTANTS.DEFAULT_FILTER_KEYS}) 
    const [modalVisible, setModalVisible] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [editRequest, setEditRequest] = useState(null);

    const [refresh, setRefresh] = useState(true);
    const setRefreshPage = useCallback(() => {
        setRefresh(refresh => !refresh);
      }, []);

    useEffect(() => {
        fetch(pagination, sortColumn, sortOrder, searchKeyword, filter);
    }, [pagination, sortColumn, sortOrder, searchKeyword, refresh, filter]);


    useEffect(() => {
        handleModalActivate()
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
            render: (val) => val==='1' ? <Tag color="green">Active</Tag> : <Tag color="red">InActive</Tag>,
            filters: [
                { text: 'Active', value: '1' },
                { text: 'InActive', value: '0' },
              ],
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
            render: (record) => <Button type="primary" 
                    onClick={() => {setEditRequest({
                        type: SERVER_CONSTANTS.UPDATE_SERVER_TYPE, 
                        data: record})}}>Edit</Button>,
          },
          {
            title: 'Delete',
            key: 'operation',
            width: "10%",
            render: (record) => <Button danger type="primary" onClick={() => {showDeleteModal(record)} }>Delete</Button>,
          }
    ];
    
    // Handle change in page number
    const handlePageChange = (pageNumber, pageSize) => {
        // console.log(pageNumber);
        var newPageNum = pageNumber
        if(pageSize != pagination.pageSize)
            newPageNum =  Math.ceil(pagination.pageSize*pagination.page/pageSize)
        dispatch(setPagination({pagination: {page: newPageNum, pageSize: pageSize}}))
        console.log("Fetch after pagination change");
    }

    // Fetch data
    const fetch = (pagination, sortColumn, sortOrder, keyword, filter) => {
        setLoading(true);
        return getServersApi({
                            current: pagination.page, 
                            pageSize: pagination.pageSize, 
                            sortColumn: sortColumn,
                            sortOrder: sortOrder,
                            keyword: keyword,
                            filterColumn: filter.filterColumn,
                            filterKeys: filter.filterKeys})
            .then((res) => {
            setLoading(false);
            console.log(res.data)
            setTotal(res.data[0]?res.data[0].Total: 0)
            // setData(res.data);
            dispatch(setData(res))
        }).catch((err) => {console.log(err)});
    };

    // Handle table change: sort, filter
    function handleTableChange(pagination, filters, sorter) {
        // console.log('params', sorter);
        console.log('Filters; ',filters);
        var newSortColumn = sorter.column? sorter.column.dataIndex: 'Name'
        var newSortOrder = sorter.order ==='descend'?'descend':'ascend'
        dispatch(setSort({sortColumn: newSortColumn, sortOrder: newSortOrder }));

        // Filter
        var filterKeys = filters.Status? filters.Status.join(): SERVER_CONSTANTS.DEFAULT_FILTER_KEYS
        setFilter({filterColumn: filter.filterColumn, filterKeys: filterKeys})
        // console.log("Fetch after sort change");
    }

    //Handle search 
    function handleSearchServer(keyword){
        setSearchKeyword(keyword)
        // console.log("Fetch after search");
    }

    // Handle on edit click
    function handleModalActivate(){
        if(editRequest){
            setModalVisible(true)
        }
    }

    // Show delete modal
    function showDeleteModal(record) {
        confirm({
          title: "Do you want to delete server " + record.Name,
          icon: <ExclamationCircleOutlined />,
          content: "Warning: The delete user cannot be recover",
          onOk() {
            handleDeleteServer(record.Id)    
          },
          onCancel() {},
        });
    }

    // Handle delete server
    function handleDeleteServer(id) {
        return deleteServerApi({id: id})
        .then((res) => {
            console.log("Delete response", res)
            setRefreshPage();
        })
        .catch(() => console.log("Oops errors!"));    
    }
    
    // Open notifcation
    // const openNotification = (message) => {
    //     notification.open({
    //       message: message,
    //       description:
    //         message,
    //       onClick: () => {
    //         console.log('Notification Clicked!');
    //       },
    //     });
    // };

    function toggleExport() {
        setExporting(exporting => !exporting)
    }

    return (
        <React.Fragment>
            <div>
                <Button onClick={toggleExport} style={{marginBottom: '20px'}}>Export server list</Button>
                <ExportServer id='export-server' className='export-server' visible = {exporting} csvData={data} fileName='server'></ExportServer>
            </div>
            <Button type="primary" onClick={()=> setEditRequest(SERVER_CONSTANTS.ADD_SERVER_REQUEST)} style={{ background: 'lawngreen', color: 'black'}}>
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
                onChange={handleTableChange}
            />
            
            <Pagination
                showQuickJumper 
                total={total}
                current ={pagination.page}
                pageSize={pagination.pageSize}
                onChange = {handlePageChange}
            />
        </React.Fragment>
    );
}

export default MainPage;
