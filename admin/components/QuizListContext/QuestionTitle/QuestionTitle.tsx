import React, { FC } from 'react'
import { TitleProps } from '../types'

import './QuestionTitle.css'

const QuestionTitle: FC<TitleProps> = (props: TitleProps) => {
  return (
    <div className="title-wrapper">
      <span className="font-wrapper">{ `${props.id}. ${props.title}` }</span>
    </div>
  )
} 

export default QuestionTitle