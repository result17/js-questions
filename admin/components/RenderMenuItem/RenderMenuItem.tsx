import React, { FC, useContext, useMemo } from 'react'
import { AuthContext } from '../../components/AuthProvider/index'
import { RouteComponentProps } from 'react-router-dom'
import { Menu } from 'antd'
import { MyRoute } from 'routes/myRoutes'

const { SubMenu } = Menu

interface RenderMenuItemProps {
  routes: MyRoute[],
  routeComponentProps: RouteComponentProps 
}

const RenderMenuItem: FC<RenderMenuItemProps> = (props: RenderMenuItemProps) => {
  const auth = useContext(AuthContext)

  const renderMenuItem = (routes: MyRoute[]) => {
    // 根据context中的角色动态加载菜单
    return useMemo(() => {
      const asyncMenuItem = routes.reduce((menuItemList, route) => {
        if (route.isMenuItem && route.roles && route.roles.indexOf(auth.state.role) !== -1) {
          menuItemList.push(route.subs ? (
            <SubMenu
              key={ route.title }
              title={
                <span>
                  { route.icon }
                  <span>{ route.title }</span>
                </span>
              }
            >
              { renderMenuItem(route.subs) }
            </SubMenu>
          ) : (
            <Menu.Item
              key={ route.title }
              title={
                <span>
                  { route.icon }
                  <span>{ route.title }</span>
                </span>
              }
            >
            </Menu.Item>
          ))
        } 
        return menuItemList
      }, [])
      return asyncMenuItem
    }, [auth.state.role])
  }

  return (
    <>
    { renderMenuItem(props.routes) }
  </>)
}

export default RenderMenuItem