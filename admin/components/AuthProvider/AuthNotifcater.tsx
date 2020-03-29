import React, { FC, useEffect, memo, useRef } from 'react'
import { notification } from 'antd'
import { UserOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons'

const AuthNotifcater: FC = (props) => {
  const keyRef = useRef({
    verify: 'VERIFY'
  })
  const notificationsRef = useRef({
    verifingNotification() {
      const verifingIcon = <UserOutlined style={{ fontSize: 24 }} />
      const args = {
        message: '登录中',
        description: '登录中请稍候',
        duration: 0,
        icon: verifingIcon,
        key: keyRef.current.verify,
      }
      notification.open(args)
    },
    FailedNotification() {
      const failedIcon = <CloseOutlined style={{ fontSize: 24 }} />
      const args = {
        message: '验证失败',
        description: '请重新登录',
        duration: 3,
        icon: failedIcon,
        key: keyRef.current.verify,
      }
      notification.open(args)
    },
    successNotification() {
      const successIcon = <CheckOutlined style={{ fontSize: 24 }}/>
      const args = {
        message: '登录成功',
        description: '跳转至主页',
        duration: 3,
        icon: successIcon,
        key: keyRef.current.verify,
      }
      notification.open(args)
    }
  })

  return(
    <>
      { props.children }
    </>
  )
}
export default memo(AuthNotifcater, [])