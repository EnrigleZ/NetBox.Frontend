import React from 'react'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'

import { Layout, Menu } from 'antd'
import { MenuItemConfig, getMenuItemKey, getSelectedKeys } from './side-menu-items'

const { Sider } = Layout

function mapItemToElement(item: any) {
  const { path, icon, title, children } = item
  const key = getMenuItemKey(path, title)

  if (children) { // contains sub item
    return (
      <Menu.SubMenu key={key} title={title} icon={icon} >
        { children.map(mapItemToElement)}
      </Menu.SubMenu>
    )
  } else {
    return (
      <Menu.Item key={key} icon={icon}>
        { path ? (
          <a href={path}>{title}</a>
        ) : title}
      </Menu.Item>
    )
  }
}

const MySideMenu: React.FunctionComponent = (props) => {
  const [collapsed, onCollapse] = React.useState(false)
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {MenuItemConfig.map(mapItemToElement)}
      </Menu>
    </Sider>
  )
}

// @ts-ignore
export default MySideMenu
