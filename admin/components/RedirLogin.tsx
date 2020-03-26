import React, { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'

const RedirLogin: FC = () => {
  return <Route path='/' exact render={() => <Redirect to='/login' />} />
}

export { RedirLogin }