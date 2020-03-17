import React, { FC } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Login } from '../components/Login'
import { Regist } from '../components/Regist'

const Routes: FC = () => {
  return (
    <Switch>
      <Route path='/' exact render={() => <Redirect to='/login' />} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/regist" component={Regist} />
    </Switch>
  )
}

export { Routes }