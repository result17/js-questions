import React, { FC } from 'react'
import { Layout } from 'antd'
import MyHeader from '../MyHeader/MyHeader'
import MySider from '../MySider/MySider'
import MyContent from '../MyContent/MyContent'
import { RouteComponentProps } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const DashBroad: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
  <Layout>
    <Header style={{ padding: '0 150px' }}>
      <MyHeader { ...props } ></MyHeader>
    </Header>
    <Layout>
      <Sider>
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