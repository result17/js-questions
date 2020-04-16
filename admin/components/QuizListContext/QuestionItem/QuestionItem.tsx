import React, { FC, useReducer } from 'react'
import { QuestionItemProps, QuestionItemState } from '../types'
import QuestionTitle from '../QuestionTitle/QuestionTitle'
import QuestionCode from '../QuestionCode/QuestionCode'
import QuestionOptions from '../QuestionOptions/QuestionOptions'
import QuestionExplanation from '../QuestionExplanation/QuestionExplanation'
import questionReducer from '../reducer'

import './QuestionItem.css'

const defaultState: QuestionItemState = {
  hasChosen: false,
  clickBtnIdx: -1,
}

const QuestionItem: FC<QuestionItemProps> = (props: QuestionItemProps) => {
  const [state, dispatch] = useReducer(questionReducer, defaultState)

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
        options={ props.data.options }
        chosen={ state.hasChosen }
        clickBtnIdx={ state.clickBtnIdx }
        dispatch={ dispatch }
      ></QuestionOptions>
      <QuestionExplanation 
        chosen={ state.hasChosen }
        text={ props.data.explanation }
      ></QuestionExplanation>
    </div>
  )
}

export default QuestionItem