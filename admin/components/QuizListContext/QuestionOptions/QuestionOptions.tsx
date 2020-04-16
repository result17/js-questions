import React, { FC } from 'react'
import { Button } from 'antd'
import { QuestionOption, ItemAction, QuestionItemAction, QuestionOptionsProps } from '../types'

import './QuestionOptions.css'

const QuestionOptions: FC<QuestionOptionsProps<QuestionOption>> = (props: QuestionOptionsProps<QuestionOption>) => {
  // React合成事件机制
  return (
    <div className="btns-wrapper">
      {
        props.options.map((btn, idx) => {
           
          const handleClick = (e: React.MouseEvent) => {
            if (!props.chosen) {
              const action: QuestionItemAction = {
                type: ItemAction.CHOOSE,
                idx: idx
              }
              props.dispatch(action)
            }
          }

          return (
            btn.correct ? 
            <Button
              block={ true }
              key={ btn.text }
              onClick={ handleClick }
              type={props.chosen ? 'primary' : 'default'}
            >{ btn.text }</Button> :
            <Button
              block={ true } 
              key={ btn.text }
              onClick={ handleClick }
              type={props.clickBtnIdx === idx ?  "danger" : "default" }
            >{ btn.text }</Button>
          )
        })
      }
    </div>
  )
}

export default QuestionOptions