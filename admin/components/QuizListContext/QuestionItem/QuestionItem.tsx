import React, { FC } from 'react'
import { QuestionItemProps } from '../types'
import QuestionTitle from '../QuestionTitle/QuestionTitle'
import QuestionCode from '../QuestionCode/QuestionCode'
import QuestionOptions from '../QuestionOptions/QuestionOptions'
import QuestionExplanation from '../QuestionExplanation/QuestionExplanation'

import { Divider } from 'antd'

import './QuestionItem.css'

const QuestionItem: FC<QuestionItemProps> = (props: QuestionItemProps) => {

  return (
    <div 
      className="item-wrapper" 
      style={ props.style }
    >
      <QuestionTitle 
        title={ props.data.title }
        id={ props.data.id }
      ></QuestionTitle>
      <QuestionCode 
        code={ props.data.code }
      ></QuestionCode>
      <QuestionOptions
        itemIdx={ props.itemIdx } 
        options={ props.data.options }
      ></QuestionOptions>
      <QuestionExplanation
        itemIdx={ props.itemIdx }  
        text={ props.data.explanation }
      ></QuestionExplanation>
      <Divider className="divider-wrapper"/>
    </div>
  )
}

export default QuestionItem