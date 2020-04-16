import React, { FC } from 'react'
import { CodeMirrorProps, CodeMirror } from '../../CodeMirror/CodeMirror'
import { QuestionCodeProps } from '../types'

import './QuestionCode.css'

const noCodeNotic = '// 此题无代码'

const QuestionCode: FC<QuestionCodeProps> = (props: QuestionCodeProps) => {
  const codeMirrorProps: CodeMirrorProps = {
    value: props.code ||  noCodeNotic,
    options: {
      mode: 'javascript',
      theme: 'material',
      lineNumbers: false,
      readOnly: true,
    }
  }
  return (
    <div className="code-wrapper">
      {
        <CodeMirror { ...codeMirrorProps }></CodeMirror>
      }
    </div>
  ) 
}

export default QuestionCode