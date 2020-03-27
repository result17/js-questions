import React, { FC, useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { AuthContext } from '../components/AuthProvider'
import { MyRoute } from './myRoutes'

interface RenderRoutesProp {
  routes: MyRoute[]
}

const RenderRoutes: FC<RenderRoutesProp> = (prop: RenderRoutesProp) => {
  const auth =  useContext(AuthContext)
  const routes = prop.routes
  
  const renderRoutes = () => {
    // 根据context中的角色动态加载路由，推出登录的角色是logout
    return routes.reduce((routeList, route, i) => {
      if (route.roles && route.roles.indexOf(auth.role) !== -1) {
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
  }

  return (
    <Switch>
      { renderRoutes() }
    </Switch>
  )
}

export default RenderRoutes