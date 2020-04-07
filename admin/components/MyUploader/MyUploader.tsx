import React, { FC } from 'react'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface UploaderProps {
  name: string,
  multiple: boolean,
  action: string,
  accept: string,
  onChange: (info: any) => void
}

interface MyUploaderProps {
  props: UploaderProps,
  text: string
}

const MyUploader: FC<MyUploaderProps> = (props: MyUploaderProps) => {

  return (
    <Upload { ...props.props }>
      <Button type="primary">
        <UploadOutlined />{ props.text }
      </Button>
    </Upload>
  )
}

export { MyUploaderProps, MyUploader }