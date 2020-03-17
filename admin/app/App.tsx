import React, { FC } from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from '../routes'

const App: FC = () => {
  return (
    <>
     <ConfigProvider>
       <Router>
         <Routes></Routes>
       </Router>
     </ConfigProvider>
    </>
  )
}

export { App }