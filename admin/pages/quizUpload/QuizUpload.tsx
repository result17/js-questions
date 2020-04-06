import React, { FC } from 'react'
import { DragUploaderProps, DragUploader } from 'components/DragUploader/DragUploader'
import {CodeMirrorProps, CodeMirror } from 'components/CodeMirror/CodeMirror'

const dragUploaderProps: DragUploaderProps = {
  name: 'js-questions json',
  multiple: false,
  action: '/uploadJson',
  onChange(info) {
    const { status } = info.file
    if (status === 'uploading') {
      // 
    } else if (status === 'error') {
      // 
    } else if (status === 'done') {
      // 
    }
  }
}

const jsonDemo = '{"data":{"questions":[{"id":"1","code":"console.log(\'hello world!\')","title":"Hello World!","option":[{"text":"a","correct":false,"__typename":"Option"},{"text":"b","correct":false,"__typename":"Option"},{"text":"c","correct":true,"__typename":"Option"},{"text":"d","correct":false,"__typename":"Option"}],"explanation":"Hello World!","__typename":"Question"}]}}'

const codeMirrorProps: CodeMirrorProps = {
  value: jsonDemo,
  options: {
    mode: 'javascript',
    theme: 'material',
    lineNumbers: true,
    readOnly: true
  }
} 

const QuizUpload: FC = () => {
  return(
    <>
      <CodeMirror { ...codeMirrorProps }></CodeMirror>
      <DragUploader { ...dragUploaderProps }></DragUploader>
    </>
  )
}

export default QuizUpload