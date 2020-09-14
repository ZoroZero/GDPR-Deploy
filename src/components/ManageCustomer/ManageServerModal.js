import { Col, Row, Space, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
    getServersCustomer,
    SetServers,
} from "../../features/ManageCustomer/slice";
import { Typography } from "antd";
import { Button, Tooltip, Table } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
const { Title } = Typography;

const ManageServerModal = (props) => {
    const dispatch = useDispatch();
    const { servers } = useSelector((state) => state.customerManagement);
    const shouldGetData = props.modalVisible !== false;

    useEffect(() => {
        if (shouldGetData) {
            console.log("USE EFFECT MANAGE SERVER", props);
            dispatch(getServersCustomer(props.record.Id));
        }
    }, [shouldGetData, props.record]);

    const handleOk = () => {
        props.setModalVisible(false);
    };

    const handleCancel = () => {
        props.setModalVisible(false);
    };
    const columns = [
        {
            title: "Owned",
            dataIndex: "Id",
            key: "Id",
            align: "center",
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
                    description={record.IpAddress}
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
                width={600}
            >
                <Row>
                    <Col span={12} style={{ border: "1px solid gray", padding: "10px" }}>

                        <Table
                            columns={columns}
                            dataSource={servers}
                            pagination={false}
                            scroll={{ y: 500 }}
                        />
                    </Col>
                    <Col span={12}></Col>
                </Row>
            </Modal>
        </>
    );
};

export default ManageServerModal;
