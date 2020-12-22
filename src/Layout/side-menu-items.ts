import React from 'react'
import {
  DesktopOutlined,
  UserOutlined,
} from '@ant-design/icons'

type MenuItemType = {
  path?: string,
  icon?: any,
  title: string,
  children?: Array<MenuItemType>,
  key?: string
}

export const getMenuItemKey = (path?: string, title?: string) => {
  return `${path}_${title}`
}

export const MenuItemConfig: Array<MenuItemType> = [{
    path: 'box',
    icon: React.createElement(DesktopOutlined),
    title: 'My Box'
  },
  // {
  //   icon: React.createElement(UserOutlined),
  //   title: 'Test Group',
  //   children: [
  //     {
  //       path: 'test-path',
  //       title: 'test title'
  //     }
  //   ]
  // }
]

export function getSelectedKeys (pathname: string, items: Array<MenuItemType> ) {
  const PREFIX = '/'
  if (pathname.indexOf(PREFIX) === 0) pathname = pathname.substr(PREFIX.length)

  const ret: Array<string> = []
  const n = items.length

  for (let i = 0; i < n; ++ i) {
    const { title, path, children } = items[i]
    const key = getMenuItemKey(path, title)

    if (children) {
      ret.push(...getSelectedKeys(pathname, children))
    } else if (path === pathname) {
      ret.push(key)
    }
  }

  return ret
}
