import { FC } from 'react'
import { Roles } from '../components/AuthProvider'
import { RedirLogin } from '../components/RedirLogin'
// 
import { Layout } from '../components/Layout'
import { Login, Regist, NotFound } from '../pages/index'

interface Route {
  path: string,
  component?: FC,
}

interface ConstantRoute extends Route {
  path: '/login' | '/regist' | '/' | '*'
}

interface AsyncRoute extends Route {
  roles?: Roles[]
}


const constantRoutes: ConstantRoute[] = [{
  path: '/',
  component: RedirLogin
}, {
  path: '/login',
  component: Login
}, {
  path: '/regist',
  component: Regist
}]

// 没有roles属性代表任意role都可以浏览
const AsyncRoutes: AsyncRoute[] = [{
  path: '/',
  component: Layout,
  roles: ['adimin', 'root', 'user']
}, {
  path: '/login',
  component: Login
}, {
  path: '/regist',
  component: Regist
}, {
  path: '/quizlib',
  component: Layout,
  roles: ['adimin', 'root']
}]

export { constantRoutes, AsyncRoutes }