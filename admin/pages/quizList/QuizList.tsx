import React, { FC } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import NotFound from '../notFound/NotFound'
import { QuizListContext } from '../../components/QuizListContext/QuizListContext'

interface IState {
  dataUrl: string
}

const QuizList: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    props.location.state && props.history.location.state.hasOwnProperty('dataUrl') ? 
    <QuizListContext url={ (props.history.location.state as IState).dataUrl }></QuizListContext> : 
    <NotFound></NotFound>
  )
}

export default withRouter(QuizList)