import React, { FC, useContext, useMemo } from 'react'
import { Switch, Route } from 'react-router-dom'
import { AuthContext } from '../components/AuthProvider/index'
import { MyRoute } from './myRoutes'

interface RenderRoutesProps {
  routes: MyRoute[]
}

const RenderRoutes: FC<RenderRoutesProps> = (props: RenderRoutesProps) => {
  const auth = useContext(AuthContext)
  
  const renderRoutes = (routes: MyRoute[]) => {
    // 根据context中的角色动态加载路由，推出登录的角色是logout
    return useMemo(() => {
      const asyncRoutes = (routes: MyRoute[]) => {
        return (routes.reduce((routeList, route) => {
          if (route.roles && route.roles.indexOf(auth.state.role) !== -1) {
            routeList.push((
              <Route 
                key={ route.title }
                exact={ true }
                path={ route.path }
                render={ props => <route.component { ...props } /> }
              />
            ))
          }
          if (route.subs) {
            for (const subRoute of asyncRoutes(route.subs)) {
              routeList.push(subRoute)
            }
          }
          return routeList
        }, []))
      }
      return asyncRoutes(routes)
    }, [auth.state.role])
  }

  return (
    <Switch>
      { renderRoutes(props.routes) }
    </Switch>
  )
}

export default RenderRoutes