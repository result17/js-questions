import React, { FC, useContext, useMemo } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../components/AuthProvider/index'
import { MyRoute } from 'routes/myRoutes'

interface RenderContentRouteProps {
  routes: MyRoute[]
}

const RenderContentRoute: FC<RenderContentRouteProps> = (props: RenderContentRouteProps) => {
  const auth = useContext(AuthContext)
  
  const renderContentRoute = (routes: MyRoute[]) => {
    const asyncContentRoute = routes.reduce((contentRouteList, route) => {
      if (route.contextComp && route.roles && route.roles.indexOf(auth.state.role) !== -1) {
        contentRouteList.push((
          <Route
            key={ route.title }
            exact={ true }
            path={ route.path }
            render={ props => <route.contextComp { ...props }/>}
          />
        ))
      }
      if (route.subs) {
        contentRouteList.concat(renderContentRoute(route.subs))
      }
      return contentRouteList
    }, [])
    return asyncContentRoute
  }
 
  const defaultRedir = (path: string) => {
    return <Redirect from='/'  to={ path } />
  }

  const memo = useMemo(() => {
    return renderContentRoute(props.routes).concat(defaultRedir('/chart'))
  }, [auth.state.role])

  return (
    <Switch>
      { memo }
    </Switch>
  )
}

export default RenderContentRoute
