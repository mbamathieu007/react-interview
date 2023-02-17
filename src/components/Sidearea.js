
import {
    UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
const items = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `Menu ${index + 1}`,
}));

function Sidearea() {
    //Code du menu latéral
    return (
        <Menu style={{
            height: '100%',
            borderRight: 0,
            marginTop: 100,
        }} mode="inline" defaultSelectedKeys={['4']} items={items} />

    );

}

export default Sidearea