import React, { FC } from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from '../routes'
import { AuthProvider } from '../components/AuthProvider'

// authProvider
const App: FC = () => {
  
  return (
    <AuthProvider>
      <ConfigProvider>
        <Router>
          <Routes></Routes>
        </Router>
      </ConfigProvider>
    </AuthProvider>
  )
}

export { App }