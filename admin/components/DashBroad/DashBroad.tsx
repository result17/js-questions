import React, { FC, useState } from 'react'
import { Layout } from 'antd'
import MyHeader from '../MyHeader/MyHeader'
import MySider from '../MySider/MySider'
import MyContent from '../MyContent/MyContent'
import { RouteComponentProps } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const DashBroad: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  return (
  <Layout>
    <Header style={{ padding: '0 150px 0 50px' }}>
      <MyHeader { ...props } ></MyHeader>
    </Header>
    <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Sider width={280} collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <MySider {...props}></MySider>
      </Sider>
      <Content>
        {/* 主要内容区域，嵌套路由 */}
        <MyContent></MyContent>
      </Content>
    </Layout>
  </Layout>)
}

export default DashBroad