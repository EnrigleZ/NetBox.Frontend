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
          <Link to={path}>{title}</Link>
        ) : title}
      </Menu.Item>
    )
  }
}

const MySideMenu: React.FunctionComponent<RouteComponentProps> = (props: RouteComponentProps) => {
  const [collapsed, onCollapse] = React.useState(false)
  const selectedKeys = getSelectedKeys(props.location.pathname, MenuItemConfig)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" selectedKeys={selectedKeys} defaultSelectedKeys={['1']} mode="inline">
        {MenuItemConfig.map(mapItemToElement)}
      </Menu>
    </Sider>
  )
}

// @ts-ignore
export default withRouter(MySideMenu)
