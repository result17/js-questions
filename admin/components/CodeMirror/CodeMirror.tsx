import React, { FC } from 'react'
import { EditorConfiguration } from 'codemirror'
import { UnControlled } from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'

interface CodeMirrorProps {
  value: string
  options: EditorConfiguration
}

const CodeMirror: FC<CodeMirrorProps> = (props: CodeMirrorProps) => {

  return(
    <UnControlled
      value={ props.value }
      options={ props.options }
    ></UnControlled>
  )
}

export { CodeMirrorProps, CodeMirror }
