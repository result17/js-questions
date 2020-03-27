import React, { lazy, FC, Suspense } from 'react'
import Fallback from './fallback/Fallback'

const atLeastDelayTime: number = 1500

// 有bug， delayLoad不能抽象到函数使用，否则报错cant find module
const LoginContainer: FC = lazy(async () => {
  const importPromise = import('./login/Login')
  const delayPromise = new Promise(res => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      res()
    }, atLeastDelayTime)
  })
  return Promise.all([importPromise, delayPromise]).then(() => importPromise)
})
const RegistContainer: FC = lazy(async () => {
  const importPromise = import('./regist/Regist')
  const delayPromise = new Promise(res => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      res()
    }, atLeastDelayTime)
  })
  return Promise.all([importPromise, delayPromise]).then(() => importPromise)
})
const NotFoundContainer: FC = lazy(async () => {
  const importPromise = import('./notFound/NotFound')
  const delayPromise = new Promise(res => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      res()
    }, atLeastDelayTime)
  })
  return Promise.all([importPromise, delayPromise]).then(() => importPromise)
})

const Login: FC = () => {
  return (
    <div>
      <Suspense fallback={ <Fallback /> }>
        <LoginContainer />
      </Suspense>
    </div>
  )
}

const Regist: FC = () => {
  return (
    <div>
      <Suspense fallback={ <Fallback /> }>
        <RegistContainer />
      </Suspense>
    </div>
  )
}

const NotFound: FC = () => {
  return (
    <div>
      <Suspense fallback= { <Fallback /> }>
        <NotFoundContainer />
      </Suspense>
    </div>
  )
}

export { Login, Regist, NotFound, Fallback }