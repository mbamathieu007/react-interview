
import {
    UserOutlined,
    BellOutlined,
    VideoCameraAddOutlined
} from '@ant-design/icons';
import { Avatar, Space, Badge, Dropdown } from 'antd';
const items = [
    {
        label: <a href="#">Profile</a>,
        key: '0',
    },
    {
        label: <a href="#">Deconnexion</a>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: 'Preferences',
        key: '3',
    },
];

function Userarea() {
    //composant du menu utilisateur (profile, notifications, etc.)
    return (

        <Space wrap size={16} style={{
            float: 'right',
        }}>


            <Avatar style={{ backgroundColor: 'white' }} shape="square" icon={<VideoCameraAddOutlined style={{ fontSize: 30, color: 'black' }} />} />

            <Badge count={1}>
                <Avatar style={{ backgroundColor: 'white' }} shape="square" icon={<BellOutlined style={{ fontSize: 30, color: 'black' }} />} />
            </Badge>

            <Dropdown
                menu={{
                    items,
                }}
                trigger={['click']}
            >
                <Avatar size="large" style={{ backgroundColor: '#BA002B' }} icon={<UserOutlined />} onClick={(e) => e.preventDefault()}>
                </Avatar>

            </Dropdown>

        </Space>



    );

}

export default Userarea