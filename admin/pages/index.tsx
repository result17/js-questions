import React, { lazy, FC, Suspense } from 'react'
import Fallback from './fallback/Fallback'
import { RouteComponentProps } from 'react-router-dom'

const atLeastDelayTime: number = 1500

// 有bug， delayLoad不能抽象到函数使用，否则报错cant find module
const LoginContainer: FC<RouteComponentProps> = lazy(async () => {
  const importPromise = import('./login/Login')
  const delayPromise = new Promise(res => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      res()
    }, atLeastDelayTime)
  })
  return Promise.all([importPromise, delayPromise]).then(() => importPromise)
})

const RegistContainer: FC<RouteComponentProps> = lazy(async () => {
  const importPromise = import('./regist/Regist')
  const delayPromise = new Promise(res => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      res()
    }, atLeastDelayTime)
  })
  return Promise.all([importPromise, delayPromise]).then(() => importPromise)
})

const NotFoundContainer: FC<RouteComponentProps> = lazy(async () => {
  const importPromise = import('./notFound/NotFound')
  const delayPromise = new Promise(res => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      res()
    }, atLeastDelayTime)
  })
  return Promise.all([importPromise, delayPromise]).then(() => importPromise)
})

const Login: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <>
      <Suspense fallback={ <Fallback /> }>
        <LoginContainer { ...props }/>
      </Suspense>
    </>
  )
}

const Regist: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <>
      <Suspense fallback={ <Fallback /> }>
        <RegistContainer {...props}/>
      </Suspense>
    </>
  )
}

const NotFound: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <>
      <Suspense fallback= { <Fallback /> }>
        <NotFoundContainer {...props}/>
      </Suspense>
    </>
  )
}

export { Login, Regist, NotFound, Fallback }