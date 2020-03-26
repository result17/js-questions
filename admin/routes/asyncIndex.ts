import React, {FC, useContext} from 'react'
import { Switch, Route } from 'react-router-dom'
import { AuthContext } from '../components/AuthProvider'
import { constantRoutes, AsyncRoutes } from './router'

const RenderRoutes: FC = () => {
  const auth =  useContext(AuthContext)

  
}