import React, { useMemo } from 'react'

import { Layout, Menu } from 'antd'
import { DesktopOutlined } from '@ant-design/icons'

import { getPathName, getFullUrl } from '@/utils/url';
const { Sider } = Layout

function mapItemToElement(item: any) {
  const { name, title, children, shortTitle, entry } = item;

  const path = entry || `${name}.html`;

  if (children) { // contains sub item
    return (
      <Menu.SubMenu key={name} title={title} icon={<DesktopOutlined />} >
        { children.map(mapItemToElement)}
      </Menu.SubMenu>
    )
  } else {
    return (
      <Menu.Item key={path} icon={<DesktopOutlined />}>
        { name ? (
          <a href={getFullUrl(path)}>{shortTitle || title}</a>
        ) : title}
      </Menu.Item>
    )
  }
}

const MySideMenu: React.FunctionComponent = () => {
  const [collapsed, onCollapse] = React.useState(false)
  const pathname = useMemo(() => getPathName(), []);
  console.log(pathname)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline">
        {SITE_PAGES.map(mapItemToElement)}
      </Menu>
    </Sider>
  )
}

// @ts-ignore
export default MySideMenu
