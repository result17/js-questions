import { FC } from 'react'
import { RoleList, Role } from '../components/AuthProvider'
import { RedirLogin } from '../components/RedirLogin'
import { Layout } from '../components/Layout'
import { Login, Regist, NotFound } from '../pages/index'
import { RouteComponentProps } from 'react-router-dom'

interface MyRoute {
  path: '/login' | '/regist' | '/' | '*' | '/quizLib'
  component: FC<RouteComponentProps>,
  roles: Role[]
}

const routes: MyRoute[] = [{
  path: '/',
  component: RedirLogin,
  roles: [RoleList.logout]
}, {
  path: '/',
  component: Layout,
  roles: [RoleList.admin, RoleList.root, RoleList.user]
}, {
  path: '/login',
  component: Login,
  roles: [RoleList.admin, RoleList.root, RoleList.user, RoleList.logout]
}, {
  path: '/regist',
  component: Regist,
  roles: [RoleList.admin, RoleList.root, RoleList.user, RoleList.logout]
}, {
  path: '/quizLib',
  component: Layout,
  roles: [RoleList.admin, RoleList.root]
}, {
  path: '*',
  component: NotFound,
  roles: [RoleList.admin, RoleList.root, RoleList.user, RoleList.logout]
}]

export { routes, MyRoute }