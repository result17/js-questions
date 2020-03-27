import { FC } from 'react'
import { Roles } from '../components/AuthProvider'
import { RedirLogin } from '../components/RedirLogin'
import { Layout } from '../components/Layout'
import { Login, Regist, NotFound } from '../pages/index'
import { RouteComponentProps } from 'react-router-dom'

interface MyRoute {
  path: '/login' | '/regist' | '/' | '*' | '/quizLib'
  component: FC<RouteComponentProps>,
  roles: Roles[]
}

const routes: MyRoute[] = [{
  path: '/',
  component: RedirLogin,
  roles: ['logout']
}, {
  path: '/',
  component: Layout,
  roles: ['admin', 'root', 'user']
}, {
  path: '/login',
  component: Login,
  roles: ['admin', 'root', 'user', 'logout']
}, {
  path: '/regist',
  component: Regist,
  roles: ['admin', 'root', 'user', 'logout']
}, {
  path: '/quizLib',
  component: Layout,
  roles: ['admin', 'root']
}, {
  path: '*',
  component: NotFound,
  roles: ['admin', 'root', 'user', 'logout']
}]

export { routes, MyRoute }