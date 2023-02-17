import { MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png'
import { Breadcrumb, Layout, Space,theme } from 'antd'; 
import React, { useState, useEffect } from 'react';
import Userarea from './Userarea';
import Sidearea from './Sidearea';
import  Maincontent from './Maincontent';
import  Searchcontent from './Searchcontent';
import  Searchbar from './Searchbar';
import { useSelector,useStore } from "react-redux";
import { fetchOrUpdateFilms } from './store'
 
const { Header, Content, Footer, Sider } = Layout;

 
function Pageprincipale() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const mysearchstatus = useSelector((state) => state.searchstatus);
    //lecture des films
  const store = useStore()
  useEffect(() => {
    // on exécute notre action asynchrone avec le store en paramètre
    fetchOrUpdateFilms(store) 
   // setData(originlist);
  }, [store])
    
    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', background: colorBgContainer, }} className="header">
            <Space wrap direction="horizontal">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                  })}
                <div
                    style={{ 
                        width: 50,
                        height: 31, 
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                >
                   <img src={logo} alt='films' />   </div>
                 <div
                 style={{  
              }}>
                <Searchbar/> 
                </div>
                
                
                </Space>
                <Space wrap direction="horizontal" style={{
            float: 'right',
            right: "20%", 
        }}>
                <Userarea/> 
                </Space>
             
            </Header>
            <Layout>
                <Sider
                    trigger={null} collapsible collapsed={collapsed}
                    width={200}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Sidearea/> 

                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                        marginLeft: 200,
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Accueil {mysearchstatus?( "/ Recherche"): (null)}</Breadcrumb.Item> 
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        
                       {mysearchstatus?( <Searchcontent/>): ( <Maincontent/>)
                       
                       }

                    </Content>
                    <Footer style={{ textAlign: 'center' }}> FILMS ©2023 Created by Mathieu MBA</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Pageprincipale