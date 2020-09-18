import React, { useEffect, useState } from "react";
import { Table, Pagination, Input, Button, Modal, Tag, Menu, Dropdown, message, Row, Col, Space } from "antd";
// import { UploadOutlined } from '@ant-design/icons';
import "./index.scss";
import { getServersApi, deleteServerApi, updateMultipleStatusApi } from "api/server";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "features/ManageServer/slice";
import AddEditServerModal from "components/ManageServer/AddEditServerModal"; 
import { SERVER_CONSTANTS } from 'constants/ManageServer/server';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ExportServer from 'components/ManageServer/ExportServer';
import ImportServer from "components/ManageServer/ImportServer";
import { DownOutlined, UploadOutlined } from '@ant-design/icons'

MainPage.propTypes = {};

const { Search } = Input
const { confirm } = Modal;


function MainPage() {
    const dispatch = useDispatch()

    const { refresh } = useSelector((state) => state.serverManagement)
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [total, setTotal ] = useState(0);

    const [pagination, setPagination ] = useState({
        page: 1,
        pageSize: 10
    });
    const [sorter, setSorter] = useState({
        sortColumn: SERVER_CONSTANTS.DEFAULT_SORT_COLUMN,
        sortOrder: SERVER_CONSTANTS.DEFAULT_SORT_ORDER
    })
    const [searchKeyword, setSearchKeyword] = useState('');  
    const [filter, setFilter] = useState({filterColumn: SERVER_CONSTANTS.DEFAULT_FILTER_COLUMN, filterKeys: SERVER_CONSTANTS.DEFAULT_FILTER_KEYS}) 
    const [modalVisible, setModalVisible] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [importing, setImporting] = useState(false);
    const [editRequest, setEditRequest] = useState(null);
    // const [checkingRows, setCheckingRows] = useState([])
    const [selectingServerIdList, setSelectingServerIdList] = useState([]);

    useEffect(() => {
        fetch(pagination, sorter.sortColumn, sorter.sortOrder, searchKeyword, filter);
    }, [pagination, sorter, searchKeyword, refresh, filter]);


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
            dataIndex: "IsActive",
            width: "12%",
            render: (val) => val? <Tag color="green">Active</Tag> : <Tag color="red">InActive</Tag>,
            filters: [
                { text: 'Active', value: '1' },
                { text: 'InActive', value: '0' },
              ],
        },
        {
            title: "Owner",
            dataIndex: "OwnerName",
            width: "12%",
            sorter: true,
        },
        {
            title: 'Action',
            key: 'operation',
            width: "10%",
            render: (record) => 
                    <Space size="middle" style={{ display: "flex" }}>
                        <Button type="primary" 
                        onClick={() => {setEditRequest({
                            type: SERVER_CONSTANTS.UPDATE_SERVER_TYPE, 
                            data: record})}}>Edit</Button> 
                        <Button danger type="primary" onClick={() => {showDeleteModal(record)} }>Delete</Button>
                    </Space>
          },
        //   {
        //     title: 'Delete',
        //     key: 'operation',
        //     width: "10%",
        //     render: (record) => ,
        //   }
    ];

    // Handle change in page number
    const handlePageChange = (pageNumber, pageSize) => {
        // console.log(pageNumber);
        var newPageNum = pageNumber
        if(pageSize !== pagination.pageSize && Math.ceil(total/pageSize) < pagination.pageNumber )
            newPageNum =  Math.ceil(pagination.pageSize*pagination.page/pageSize)
        setPagination({page: newPageNum, pageSize: pageSize})
        console.log("Fetch after pagination change");
        setSelectingServerIdList([])
    }

    // Fetch data
    const fetch = (pagination, sortColumn, sortOrder, keyword, filter) => {
        // console.log(filter);
        if(!exporting){
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
                console.log("Fetch res", res);
                setLoading(false);
                setTableData(res.data, res.total)
                showTotal(res.total);
            }).catch((err) => {console.log(err)});
        }
    };

    // Set table data
    const setTableData = (data, total) => {
        console.log(data)
        setTotal(total)
        setData(data);
        // dispatch(setData({data: data}))
    }

    // Handle table change: sort, filter
    const handleTableChange = (pagi, filters, sorter) => {
        console.log('Filters; ',filters);
        var newSortColumn = sorter.column? sorter.column.dataIndex: 'Name'
        var newSortOrder = sorter.order ==='descend'?'descend':'ascend'
        // dispatch(setSort({sortColumn: newSortColumn, sortOrder: newSortOrder }));
        setSorter({sortColumn: newSortColumn, sortOrder: newSortOrder })
        // Filter
        var filterKeys = filters.IsActive? filters.IsActive.join(): SERVER_CONSTANTS.DEFAULT_FILTER_KEYS
        if(filter.filterKeys!==filterKeys){
            setPagination({page: 1, pageSize: pagination.pageSize})
        }
        setFilter({filterColumn: filter.filterColumn, filterKeys: filterKeys})
        // console.log("Fetch after sort change");
        setSelectingServerIdList([])
    }

    //Handle search 
    const handleSearchServer = (keyword) => {
        setSearchKeyword(keyword)
        setPagination({page: 1, pageSize: pagination.pageSize})
        // setCheckingRows([])
        setSelectingServerIdList([])
        // console.log("Fetch after search");
    }

    // Handle on edit click
    const handleModalActivate = () => {
        if(editRequest){
            setModalVisible(true)
        }
    }

    // Show delete modal
    const showDeleteModal = (record) => {
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
    const handleDeleteServer = (id) => {
        return deleteServerApi({id: id})
        .then((res) => {
            console.log("Delete response", res)
            dispatch(setRefresh(!refresh));
        })
        .catch(() => console.log("Oops errors!"));    
    }

    // Handle toggle export
    const toggleExport = () => {
        setExporting(exporting => !exporting)
    }

    // Toggle import modal
    const toggleImport = () => {
        setImporting(importing => !importing)
    }

    // Handle row selected
    const rowSelection = {
        selectedRowKeys: selectingServerIdList,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            // setCheckingRows(selectedRows);
            setSelectingServerIdList(selectedRowKeys)
        },
        onSelect: (record, selected, selectedRows) => {
            // console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            // console.log(selected, selectedRows, changeRows);
        },
    };

    // Show total record
    const showTotal = (total) => {
        return `Total ${total} items`;
    }

    // Handle set status of checking rows
    const handleSetStatus = (status) => {
        return updateMultipleStatusApi({
            listServer: selectingServerIdList, 
            status: status
        })
        .then(res => {
            console.log("Multiple update", res);
            message.success('Successfully change status of servers')
            dispatch(setRefresh(!refresh));
        })
        .catch(err =>{
            console.log("Activate all err", err);
            message.error('Something went wrong')
        })
    }

    // Handle action menu onClick
    const handleMenuClick = (e) => {
        console.log(e)
        handleSetStatus(e.key ==='activate')
    }

    // Menu of action button
    const actionMenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="activate">
                Activate all
            </Menu.Item>
            <Menu.Item key="deactivate">
                Deactivate all
            </Menu.Item>
            {/* <Menu.Item key="delete">
                Delete all
            </Menu.Item> */}
        </Menu>
    );

    return (
        <React.Fragment>
            <div>
                <Button className="action-button" onClick={toggleImport}>Import server list</Button>
                <ImportServer visible={importing} setVisible={setImporting}></ImportServer>
            </div>

            <div>
                <Button className="action-button" onClick={toggleExport} style={{marginBottom: '20px'}}>Export server list</Button>
                <ExportServer id='export-server' className='export-server' visible={exporting} setVisible={setExporting}></ExportServer>
            </div>

            <div>
                
            <Button type="primary" onClick={()=> setEditRequest(SERVER_CONSTANTS.ADD_SERVER_REQUEST)} style={{ background: 'lawngreen', color: 'black'}}>
                Create new server
            </Button>

            <AddEditServerModal request={editRequest} modalVisible={modalVisible} 
                                setModalVisible={setModalVisible} setEditRequest={setEditRequest}>
            </AddEditServerModal>
            </div>

            <Dropdown overlay={actionMenu} disabled={selectingServerIdList.length===0} >
                        <Button style={{margin: '10px 0px 0px 0px'}}>
                            Action <DownOutlined />
                        </Button>
            </Dropdown>

            <Search className="search-bar"
                placeholder="Input search text"
                enterButton="Search"
                size="large"
                onSearch={value => handleSearchServer(value.trim())}
                style = {{
                    float: 'right',
                    marginBottom: '10px',
                    width: '400px',
                }}/>

            <Table
                columns={columns}
                rowKey={(record) => record.Id}
                rowSelection={rowSelection}
                dataSource={data}
                pagination={false}
                loading={loading}
                onChange={handleTableChange}/>
            <Row>
                <Col span={12} offset={6}>
                    <Pagination
                        showQuickJumper
                        showSizeChanger 
                        total={total}
                        current ={pagination.page}
                        pageSize={pagination.pageSize}
                        onChange = {handlePageChange}
                        showTotal={showTotal}
                        style={{margin:'8px 8px'}}/>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default MainPage;
