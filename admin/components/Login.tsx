import React, { FC } from 'react'
import { Form, Button, Input, Divider } from 'antd'
import { RouteComponentProps, Link } from 'react-router-dom'
import { FormProps } from 'antd/lib/form'

import'./Login.css'

type LoginProps = RouteComponentProps & FormProps

const Login: FC = (props: LoginProps) => {
  const ENTERKEY: string = 'Enter'

  const handleSumbit = () => {
    props.form.validateFields().then(values => {
      // Do something with value
      console.log(values)
    })
  }
  
  const handleSubmitBtnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
     handleSumbit()
  }

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // keyCode API已经被弃用
    e.preventDefault()
    if (e.key === ENTERKEY) {
      // handleSumbit(e)
    }
  }
  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <div className="form-title-wrapper">
          <h3 className="form-title">js-questions 管理</h3>
          <Divider></Divider>
        </div>
          <Form onFinish={handleSumbit}>
            <Form.Item
              label="用户名" 
              hasFeedback
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input className="form-input" placeholder="username"></Input>
            </Form.Item>
            <Form.Item
              label="密码"
              hasFeedback
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input className="form-input" placeholder="password" type="password" onKeyUp={handleInputKeyUp}></Input>
            </Form.Item>
            <Form.Item className="btn-wrapper">
              <Button type="primary" onClick={handleSubmitBtnClick}>登 录</Button>
              <Button type="link">
                <Link to="/regist">注 册</Link>
              </Button>
            </Form.Item>
          </Form>
      </div>
    </div>
  )
}

export { Login }