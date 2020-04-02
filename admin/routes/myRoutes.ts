import { FC } from 'react'
import { RoleList, Role } from '../components/AuthProvider'
import { RedirLogin } from '../components/RedirLogin'
import DashBroad from '../components/DashBroad/DashBroad'
import { Login, Regist, NotFound } from '../pages/index'
import { RouteComponentProps } from 'react-router-dom'
import { HomeOutlined, FileOutlined } from '@ant-design/icons';
import { Layout } from 'antd'

/* 
isMenuItem表明此对象是否被渲染sider，
icon代表是sider图标。
*/ 
interface MyRoute {
  path: '/login' | '/regist' | '/' | '*' | '/quizLib' | '/quizlib/upload_quiz' | '/quizlib/edit_quiz' | '/chart'
  title: string,
  component: FC<RouteComponentProps>,
  roles: Role[],
  isMenuItem: boolean,
  subs?: MyRoute[],
  icon?: React.ForwardRefExoticComponent<any>,
  contextComp?: FC<RouteComponentProps>
}

const routes: MyRoute[] = [{
  path: '/',
  title: '初始化',
  component: RedirLogin,
  isMenuItem: false,
  roles: [RoleList.logout]
}, {
  path: '/',
  component: DashBroad,
  title: '首 页',
  isMenuItem: true,
  icon: HomeOutlined,
  roles: [RoleList.admin, RoleList.root, RoleList.user]
}, {
  path: '/login',
  title: '登录',
  component: Login,
  isMenuItem: false,
  roles: [RoleList.admin, RoleList.root, RoleList.user, RoleList.logout]
}, {
  path: '/regist',
  component: Regist,
  title: '注册',
  isMenuItem: false,
  roles: [RoleList.admin, RoleList.root, RoleList.user, RoleList.logout]
}, {
  path: '/chart',
  title: '图表demo',
  component: DashBroad,
  roles: [RoleList.admin, RoleList.root, RoleList.user],
  isMenuItem: false,
  contextComp: DashBroad,
},{
  path: '/quizLib',
  title: '题库管理',
  component: DashBroad,
  isMenuItem: true,
  icon: FileOutlined,
  roles: [RoleList.admin, RoleList.root],
  subs: [{
    path: '/quizlib/upload_quiz',
    title: '上传题目',
    component: DashBroad,
    isMenuItem: true,
    roles: [RoleList.admin, RoleList.root],
  }, {
    path: '/quizlib/edit_quiz',
    title: '编辑题目',
    component: DashBroad,
    isMenuItem: true,
    roles: [RoleList.admin, RoleList.root],
  }]
}, {
  path: '*',
  title: '404',
  component: NotFound,
  isMenuItem: false,
  roles: [RoleList.admin, RoleList.root, RoleList.user, RoleList.logout]
}]

export { routes, MyRoute }