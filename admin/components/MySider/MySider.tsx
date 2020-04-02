import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import RenderMenuItem from '../RenderMenuItem/RenderMenuItem'
import { routes } from '../../routes/myRoutes'

const MySider:FC<RouteComponentProps> = (props: RouteComponentProps) => {

  return (<>
    <RenderMenuItem
      routes={ routes }
      routeComponentProps={{ ...props }}
    ></RenderMenuItem>
  </>)
}

export default MySider