import React, { FC, useContext } from 'react'
import { Button } from 'antd'
import { QuestionOption, ItemAction, QuestionItemAction, QuestionOptionsProps } from '../types'
import { ListContext } from '../QuizListContext'

import './QuestionOptions.css'

const QuestionOptions: FC<QuestionOptionsProps<QuestionOption>> = (props: QuestionOptionsProps<QuestionOption>) => {
  // React合成事件机制
  const listContext = useContext(ListContext)
  return (
    <div className="btns-wrapper">
      {
        props.options.map((btn, idx) => {
           
          const handleClick = (e: React.MouseEvent) => {
            if (!listContext.state[props.itemIdx].chosen) {
              const action: QuestionItemAction = {
                itemIdx: props.itemIdx,
                type: ItemAction.CHOOSE,
                idx: idx
              }
              listContext.dispatch(action)
            }
          }

          return (
            btn.correct ? 
            <Button
              block={ true }
              key={ btn.text }
              onClick={ handleClick }
              type={listContext.state[props.itemIdx].chosen ? 'primary' : 'default'}
            >{ btn.text }</Button> :
            <Button
              block={ true } 
              key={ btn.text }
              onClick={ handleClick }
              type={listContext.state[props.itemIdx].clickBtnIdx === idx ?  "danger" : "default" }
            >{ btn.text }</Button>
          )
        })
      }
    </div>
  )
}

export default QuestionOptions