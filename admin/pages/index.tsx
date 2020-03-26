import React, { lazy, FC, Suspense } from 'react'
import Fallback from './fallback/Fallback'

const LoginContainer: FC = lazy(() => import('./login/Login'))
const RegistContainer: FC = lazy(() => import('./regist/Regist'))
const NotFoundContainer: FC = lazy(() => import('./notFound/NotFound'))

const Login: FC = () => {
  return (
    <div>
      <Suspense fallback={ Fallback }>
        <LoginContainer />
      </Suspense>
    </div>
  )
}

const Regist: FC = () => {
  return (
    <div>
      <Suspense fallback={ Fallback }>
        <RegistContainer />
      </Suspense>
    </div>
  )
}

const NotFound: FC = () => {
  return (
    <div>
      <Suspense fallback= { Fallback }>
        <NotFoundContainer />
      </Suspense>
    </div>
  )
}

export { Login, Regist, NotFound, Fallback }