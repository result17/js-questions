import { FC } from 'react'
import { RoleList, Role } from '../components/AuthProvider'
import { RedirLogin } from '../components/RedirLogin'
import DashBroad from '../components/DashBroad/DashBroad'
import { Login, Regist, NotFound, EchartsDemo, QuizUpload, QuizList } from '../pages/index'
import QuizBrowse from '../pages/quizBrowse/QuizBrowse'
import { RouteComponentProps } from 'react-router-dom'
import { HomeOutlined, FileOutlined } from '@ant-design/icons'

/* 
isMenuItem表明此对象是否被渲染sider，
icon代表是sider图标。
*/ 
interface MyRoute {
  path: '/' | '*' | '/login' | '/regist' | '/quizlib' | '/quizlib_upload' | '/quizlib_browse' | '/chart' | '/quizlib_browse/:id'
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
  roles: [RoleList.logout],
}, {
  path: '/',
  component: DashBroad,
  title: '首页',
  isMenuItem: true,
  icon: HomeOutlined,
  roles: [RoleList.admin, RoleList.root, RoleList.user],
}, {
  path: '/login',
  title: '登录',
  component: Login,
  isMenuItem: false,
  roles: [RoleList.admin, RoleList.root, RoleList.user, RoleList.logout],
}, {
  path: '/regist',
  component: Regist,
  title: '注册',
  isMenuItem: false,
  roles: [RoleList.admin, RoleList.root, RoleList.user, RoleList.logout],
}, {
  path: '/chart',
  title: '图表demo',
  component: DashBroad,
  roles: [RoleList.admin, RoleList.root, RoleList.user],
  isMenuItem: false,
  contextComp: EchartsDemo,
},{
  path: '/quizlib',
  title: '题库管理',
  component: DashBroad,
  isMenuItem: true,
  icon: FileOutlined,
  roles: [RoleList.admin, RoleList.root],
  subs: [{
    path: '/quizlib_upload',
    title: '上传题目',
    component: DashBroad,
    isMenuItem: true,
    contextComp: QuizUpload,
    roles: [RoleList.admin, RoleList.root],
  }, {
    path: '/quizlib_browse',
    title: '查阅题库',
    component: DashBroad,
    isMenuItem: true,
    contextComp: QuizBrowse,
    roles: [RoleList.admin, RoleList.root, RoleList.user],
  }, {
    path: '/quizlib_browse/:id',
    title: '题目列表',
    component: DashBroad,
    isMenuItem: false,
    contextComp: QuizList,
    roles: [RoleList.admin, RoleList.root, RoleList.user],
  }]
}, {
  path: '*',
  title: '404',
  component: NotFound,
  isMenuItem: false,
  roles: [RoleList.admin, RoleList.root, RoleList.user, RoleList.logout],
}]

export { routes, MyRoute }