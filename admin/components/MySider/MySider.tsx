import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Menu } from 'antd'
import RenderMenuItem from '../RenderMenuItem/RenderMenuItem'
import { routes } from '../../routes/myRoutes'

const MySider:FC<RouteComponentProps> = (props: RouteComponentProps) => {

  return (
    <Menu>
      <RenderMenuItem 
        routeComponentProps={{ ...props }}
        routes={ routes }
      ></RenderMenuItem>
    </Menu>
  )
}

export default MySider