import React from 'react'
import { notification } from 'antd'
import { UserOutlined, CloseOutlined, CheckOutlined, UploadOutlined, LoadingOutlined } from '@ant-design/icons'

enum KeyList {
  verify = 'VERIFY',
  upload = 'UPLOAD'
}

const notificationTop = 80

// 凡是用到jsx语法都要使用tsx文件，还有引入React
const verifyNotifications = {
  verifingNotification() {
    const verifingIcon = <UserOutlined style={{ fontSize: 24 }} />
    const args = {
      message: '登录中',
      description: '登录中请稍候',
      duration: 0,
      icon: verifingIcon,
      key: KeyList.verify,
      top: notificationTop,
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
      key: KeyList.verify,
      top: notificationTop,
    }
    notification.open(args)
  },
  successNotification(name: string) {
    const successIcon = <CheckOutlined style={{ fontSize: 24 }} />
    const args = {
      message: '登录成功',
      description: `欢迎回来，${name}！`,
      duration: 3,
      icon: successIcon,
      key: KeyList.verify,
      top: notificationTop,
    }
    notification.open(args)
  }
}

const UploadNotifications = {
  uploadingNotification() {
    const uploadIcon = <UploadOutlined style={{ fontSize: 24 }} />
    const args = {
      message: '上传中',
      description: '上传中请稍候',
      duration: 0,
      icon: uploadIcon,
      key: KeyList.upload,
      top: notificationTop,
    }
    notification.open(args)
  },
  errorNotification() {
    const failedIcon = <CloseOutlined style={{ fontSize: 24 }} />
    const args = {
      message: '上传失败',
      description: '请检查网络是否连接',
      duration: 3,
      icon: failedIcon,
      key: KeyList.upload,
      top: notificationTop,
    }
    notification.open(args)
  },
  noMatchNotification() {
    const failedIcon = <CloseOutlined style={{ fontSize: 24 }} />
    const args = {
      message: '校验失败',
      description: '请检查上传文件格式',
      duration: 3,
      icon: failedIcon,
      key: KeyList.upload,
      top: notificationTop
    }
    notification.open(args)
  },
  successNotification() {
    const successIcon = <CheckOutlined style={{ fontSize: 24 }} />
    const args = {
      message: '添加成功',
      description: '上传并校验文件成功',
      duration: 3,
      icon: successIcon,
      key: KeyList.upload,
      top: notificationTop,
    }
    notification.open(args)
  },
  checkingNotification() {
    const loadingIcon = <LoadingOutlined style={{ fontSize: 24}} spin />
    const args = {
      message: '校验中',
      desciption: '校验文件中请稍候',
      duration: 0,
      icon: loadingIcon,
      key: KeyList.upload,
      top: notificationTop,
    }
    notification.open(args)
  }
}

export { verifyNotifications, UploadNotifications }