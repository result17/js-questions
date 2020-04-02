import React, { FC, useContext, useMemo } from 'react'
import { AuthContext } from '../../components/AuthProvider/index'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Menu } from 'antd'
import { MyRoute } from 'routes/myRoutes'

interface RenderMenuItemProps {
  routes: MyRoute[],
  routeComponentProps: RouteComponentProps 
}

// antd官方实例也存在Menu.item字体闪烁问题
const RenderMenuItem: FC<RenderMenuItemProps> = (props: RenderMenuItemProps) => {
  const auth = useContext(AuthContext)
  
  const renderMenuItem = (routes: MyRoute[]) => {
    const asyncMenuItem = routes.reduce((menuItemList, route) => {
      if (route.isMenuItem && route.roles && route.roles.indexOf(auth.state.role) !== -1) {
        menuItemList.push(route.subs ? (
          <Menu.SubMenu
            key={ route.title }
            title={
              <span>
                <route.icon></route.icon>
                <span>{ route.title }</span>
              </span>
            }
          >
            { renderMenuItem(route.subs) }
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            key={ route.title }
          >  
            {
              route.icon ? (<>
                <route.icon></route.icon>
                <span>
                  <Link to={ route.path } style={{ color: "rgba(255, 255, 255, 0.65)" }}>{ route.title }</Link>
                </span>
              </>) : (<span>
                <Link to={ route.path } style={{ color: "rgba(255, 255, 255, 0.65)" }}>{ route.title }</Link>
              </span>)
            }
          </Menu.Item>
        ))
      } 
      return menuItemList
    }, [])
    return asyncMenuItem
  }

  const memo = useMemo(() => {
    return renderMenuItem(props.routes)
  }, [auth.state.role])

  return (
    <Menu theme='dark' mode="inline">
      { memo }
    </Menu>
  )
}

export default RenderMenuItem