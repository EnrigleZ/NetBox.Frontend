import React, { CSSProperties, useCallback } from 'react'
import { Layout, Modal } from 'antd'

import MySideMenu from './side-menu'

const { Header, Content, Footer } = Layout

const logoStyle: CSSProperties = {
  float: "left",
  width: "120px",
  height: "31px",
  margin: "16px 0 16px 24px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  lineHeight: "31px",
  color: "#FFF",
  cursor: 'pointer',
}

const MyLayout: React.FunctionComponent<{}> = ({ children }) => {
  const showMetaModelCallback = useCallback(() => {
    Modal.confirm({
      title: 'Meta Information',
      content: (<div>
        <b>Commit Hash:</b>
        <br/>
        <span>{COMMIT_HASH}</span>
        <br />
        <b>Commit Message:</b>
        <br/>
        <span>{COMMIT_MESSAGE}</span>
        <br />
        <b>Build Branch:</b>
        <br/>
        <span>{BUILD_BRANCH}</span>
      </div>)
    })
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ zIndex: 1, width: '100%' }}>
        <div className="logo" style={logoStyle} onClick={showMetaModelCallback}>
          {IS_DEV ? 'DEV ENV' : 'PROD ENV'}
        </div>
      </Header>
      <Layout className="site-layout">
        <MySideMenu />
        <Layout className="pages-container">
          <Content style={{ margin: '0', display: 'flex' }}>
            { children }
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            A Simple NetBox ©<s>2020</s> 2021 Created by YC<s>, with Love</s>.
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MyLayout
