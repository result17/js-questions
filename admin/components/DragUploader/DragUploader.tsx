import React, { FC } from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload

interface DragUploaderProps {
  name: string,
  multiple: boolean,
  action: string,
  onChange: (info: any) => void
}

const DragUploader: FC<DragUploaderProps> = (props: DragUploaderProps) => {
  return (
    <Dragger style={{ userSelect: "none" }} { ...props }>
      <p className="upload=drag-text">
        <InboxOutlined />
      </p>
      <p className="upload-text">
        拖放文件或者点击区域完成上传
      </p>
    </Dragger>
  )
}

export { DragUploaderProps, DragUploader }