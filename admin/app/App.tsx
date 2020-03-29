import React, { FC } from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from '../components/AuthProvider/index'
import { routes } from '../routes/myRoutes'
import RenderRoutes from '../routes/RenderRoutes'

const App: FC = () => {

  return (
    <AuthProvider interface={'/veify'}>
      <ConfigProvider>
        <Router>
          <RenderRoutes routes={ routes }></RenderRoutes>
        </Router>
      </ConfigProvider>
    </AuthProvider>
  )
}

export { App }