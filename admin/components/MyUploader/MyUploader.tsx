import React, { FC } from 'react'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface UploaderPropsData {
  name: string,
  action: string,
}

// antd/lib/upload/interface.d.ts
interface RcCustomRequestOptions {
  onProgress: (event: {
      percent: number,
  }, file: File) => void,
  onError: (error: Error) => void,
  onSuccess: (response: object, file: File) => void,
  data: UploaderPropsData,
  filename: string,
  file: File,
  withCredentials: boolean,
  action: string,
  headers: object,
}

interface UploaderProps {
  multiple: boolean,
  accept: string,
  data: UploaderPropsData,
  onChange: (info: any) => void,
  customRequest?: (options: RcCustomRequestOptions) => void
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