import React, { FC, useState } from 'react'
import { Collapse } from 'antd'
import Markdown from 'markdown-to-jsx'
import { QuestionExplanationProps } from '../types'

import './QuestionExplanation.css'

const QuestionExplanation: FC<QuestionExplanationProps> = (props: QuestionExplanationProps) => {
  const [state, setState] = useState(true)
   
  // 用来回答后展开
  const handleChange = () => {
    setState(prevState => !prevState)
  }

  return (
    <div className="exp-wrapper">
      <Collapse 
        activeKey={props.chosen && state ? "explanation" : ""}
        onChange={ handleChange }
      >
        <Collapse.Panel
          className="panel-wrapper" 
          header="解释" 
          key="explanation" 
          disabled={ !props.chosen }
        >
          <Markdown>{ props.text }</Markdown>
        </Collapse.Panel>
    </Collapse>
    </div>
  )
}

export default QuestionExplanation