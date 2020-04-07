import React, { FC } from 'react'
import RenderContentRoute from '../RenderContentRoute/RenderContentRoute'
import { routes } from '../../routes/myRoutes' 


const MyContent:FC = () => {
  return (
    <RenderContentRoute routes={ routes }></RenderContentRoute>
  )
}

export default MyContent