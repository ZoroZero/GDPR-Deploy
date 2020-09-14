import { Col, Radio, Row, Space, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
    getServersCustomer,
    SetServers,
    getOtherServers
} from "../../features/ManageCustomer/slice";
import { Typography } from "antd";
import { Button, Tooltip, Table } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
const { Title, Text } = Typography;

const ManageServerModal = (props) => {
    const dispatch = useDispatch();
    const { servers, otherServers } = useSelector((state) => state.customerManagement);
    const shouldGetData = props.modalVisible !== false;
    const [option, setOption] = useState({
        status: 'available'
    })
    useEffect(() => {
        if (shouldGetData) {
            console.log("USE EFFECT MANAGE SERVER", props);
            dispatch(getServersCustomer(props.record.Id));
            dispatch(getOtherServers(option, props.record.Id));
        }
    }, [shouldGetData, props.record]);

    const handleOk = () => {
        props.setModalVisible(false);
    };

    const handleCancel = () => {
        props.setModalVisible(false);
    };

    const columnsOwned = [
        {
            title: "Owned Servers",
            dataIndex: "Id",
            key: "Id",
            align: "center",
            filters: [
                {
                    text: "InActive",
                    value: false,
                },
                {
                    text: "Active",
                    value: true,
                },
            ],
            onFilter: (value, record) =>
                value
                    ? record.IsActive
                    : !record.IsActive,

            render: (text, record) => (
                <Meta style={{ align: "left" }}
                    avatar={
                        <>
                            <Row>
                                {record.IsActive && <Tag color="cyan"> Active</Tag>}
                                {!record.IsActive && <Tag color="red"> InActive</Tag>}

                            </Row>
                            <Row>
                                <Tooltip title="delete">
                                    <Button
                                        style={{ margin: "5px" }}
                                        shape="circle"
                                        icon={<DeleteTwoTone />}
                                    />
                                </Tooltip>
                            </Row>
                        </>
                    }
                    title={record.Name}
                    description={<Text> {record.IpAddress}</Text>}
                />
            ),
        },
    ];

    const columnsOther = [
        {
            title: <><Text style={{ margin: "10px 10px", color: "darkblue" }}>Other Servers</Text>
                <Radio.Group defaultValue="available" style={{ width: "30" }}>
                    <Radio value="all" style={{ fontSize: "small" }}> All </Radio>
                    <Radio value="available"> Available </Radio>
                </Radio.Group></>,
            dataIndex: "Id",
            key: "Id",
            align: "center",
            filters: [
                {
                    text: "InActive",
                    value: false,
                },
                {
                    text: "Active",
                    value: true,
                },
            ],
            defaultFilteredValue: [true,],
            onFilter: (value, record) =>
                value
                    ? record.IsActive
                    : !record.IsActive,

            render: (text, record) => (
                <Meta style={{ align: "left" }}
                    avatar={
                        <>
                            <Row>
                                {record.IsActive && <Tag color="cyan"> Active</Tag>}
                                {!record.IsActive && <Tag color="red"> InActive</Tag>}

                            </Row>
                            <Row>
                                <Tooltip title="delete">
                                    <Button
                                        style={{ margin: "5px" }}
                                        shape="circle"
                                        icon={<DeleteTwoTone />}
                                    />
                                </Tooltip>
                            </Row>
                        </>
                    }
                    title={record.Name}
                    description={<><Text style={{ align: "left" }}>{record.IpAddress}</Text> {"  "}
                        {record.FirstNameCustomer ? <Text style={{ color: "blue", align: "right" }} > {record.FirstNameCustomer} {record.LastNameCustomer} </Text> : ''}</>}
                />
            ),
        },
    ];


    return (
        <>
            <Modal
                title={<Title level={4} style={{ color: "Blue", textAlign: "center" }}>
                    {props.record.FirstName} {props.record.LastName}
                </Title>}
                centered
                visible={props.modalVisible}
                forceRender={true}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <Row>
                    <Col span={12} style={{ border: "1px solid gray", padding: "10px" }}>
                        <Table
                            columns={columnsOwned}
                            dataSource={servers}
                            pagination={false}
                            scroll={{ y: 500 }}
                        />
                    </Col>
                    <Col span={12} style={{ border: "1px solid gray", padding: "10px" }}>
                        <Table
                            columns={columnsOther}

                            dataSource={otherServers}
                            pagination={false}
                            scroll={{ y: 500 }}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default ManageServerModal;
