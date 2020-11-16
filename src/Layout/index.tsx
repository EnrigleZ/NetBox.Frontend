import React, { CSSProperties } from 'react'
import { Layout } from 'antd'

import MySideMenu from './side-menu'

const { Header, Content, Footer } = Layout

const logoStyle: CSSProperties = {
  float: "left",
  width: "120px",
  height: "31px",
  margin: "16px 0 16px 24px",
  backgroundColor: "rgba(255, 255, 255, 0.3)"
}

const MyLayout: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ zIndex: 1, width: '100%' }}>
        <div className="logo" style={logoStyle} />
      </Header>
      <Layout className="site-layout">
        <MySideMenu />
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            { children }
          </Content>
          <Footer style={{ textAlign: 'center' }}>A Weird NetBox ©2020 Created by YC, with Love.</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MyLayout
