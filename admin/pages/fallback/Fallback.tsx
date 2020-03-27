import React, { FC, useLayoutEffect } from 'react'
import { notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import './Fallback.css'

const Fallback: FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const key = 'loading'
  const openNotification = () => {
    const args = {
      message: '加载中',
      description:
        '页面加载中请稍后',
      duration: 0,
      icon: antIcon,
      key: key
    }
    notification.open(args)
  }

  useLayoutEffect(() => {
    openNotification()
    return () => notification.close('loading')
  },[])

  return (
    <div className="fallback-wrapper"> </div>
  )
}

export default Fallback