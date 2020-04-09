import React, { FC } from 'react'
import { CodeMirrorProps, CodeMirror } from '../../components/CodeMirror/CodeMirror'
import { MyUploaderProps, MyUploader } from '../../components/MyUploader/MyUploader'
import jsonDemo from './jsonDemo'
import UploadDoc from './UploadDoc'
import { UploadNotifications } from '../../decarations/notifications'
import instance from '../../utils/createAxiosInst'

// 覆盖原有的code mirror样式
import './QuizUpload.css'

const myUploaderProps: MyUploaderProps = {
  text: '上传json',
  props: {
    multiple: false,
    accept: '.json',
    data: {
      name: 'js-questions-json',
      action: '/uploadData',
    },
    onChange(info) {
      const { status } = info.file
      if (status === 'uploading') {
        UploadNotifications.uploadingNotification()
      } else if (status === 'error') {
        UploadNotifications.errorNotification()
      } else if (status === 'done') {
        UploadNotifications.checkingNotification()
      }
    },
    customRequest(options) {
      // instance
      const formData = new FormData()
      formData.append(options.data.name, options.file)
      instance.post(options.data.action, formData).catch(e => console.error(e))
    }
  }
}


const codeMirrorProps: CodeMirrorProps = {
  value: jsonDemo,
  options: {
    mode: 'javascript',
    theme: 'material',
    lineNumbers: true,
    readOnly: true,
  }
} 

const QuizUpload: FC = () => {
  return(
    <div style={{ margin: '30px 30px 0', height: 'calc(100vh - 64px)'}}>
      <UploadDoc></UploadDoc>
      <div>
        <div style={{ display: 'inline-block', width: '60%', verticalAlign: 'top'}}>
          <CodeMirror { ...codeMirrorProps }></CodeMirror>
        </div>
        <div style={{ display: 'inline-block', marginLeft: '50px' }}>
          <MyUploader { ...myUploaderProps }></MyUploader>
        </div>
      </div>
    </div>
  )
}

export default QuizUpload