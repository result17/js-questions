import React from 'react'
import reactdom from 'react-dom'
import { App } from './app/App'

reactdom.render(
  <App />,
  document.querySelector('#root')
)