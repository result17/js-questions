import React from 'react'
import { notification } from 'antd'
import { UserOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons'

const key = 'VERIFY'

// 凡是用到jsx语法都要使用tsx文件，还有引入React
const notifications = {
  verifingNotification() {
    const verifingIcon = <UserOutlined style={{ fontSize: 24 }} />
    const args = {
      message: '登录中',
      description: '登录中请稍候',
      duration: 0,
      icon: verifingIcon,
      key: key,
    }
    notification.open(args)
  },
  failedNotification() {
    const failedIcon = <CloseOutlined style={{ fontSize: 24 }} />
    const args = {
      message: '验证失败',
      description: '请重新登录',
      duration: 3,
      icon: failedIcon,
      key: key,
    }
    notification.open(args)
  },
  successNotification(name: string) {
    const successIcon = <CheckOutlined style={{ fontSize: 24 }}/>
    const args = {
      message: '登录成功',
      description: `欢迎回来，${name}！`,
      duration: 3,
      icon: successIcon,
      key: key,
    }
    notification.open(args)
  }
}

export default notifications