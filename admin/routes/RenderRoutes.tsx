import React, { FC, useContext, useMemo } from 'react'
import { Switch, Route } from 'react-router-dom'
import { AuthContext } from '../components/AuthProvider/index'
import { MyRoute } from './myRoutes'

interface RenderRoutesProp {
  routes: MyRoute[]
}

const RenderRoutes: FC<RenderRoutesProp> = (prop: RenderRoutesProp) => {
  const auth =  useContext(AuthContext)
  const routes = prop.routes
  
  const renderRoutes = () => {
    // 根据context中的角色动态加载路由，推出登录的角色是logout
    return useMemo(() => {
      const asyncRoutes:MyRoute[] = routes.reduce((routeList, route, i) => {
        if (route.roles && route.roles.indexOf(auth.state.role) !== -1) {
          routeList.push((
          <Route 
            key={i}
            exact={true}
            path={route.path}
            render={props => <route.component {...props}/>}
          />))
        }
        return routeList
      }, [])
      return asyncRoutes
    }, [auth.state.role])
  }

  return (
    <Switch>
      { renderRoutes() }
    </Switch>
  )
}

export default RenderRoutes