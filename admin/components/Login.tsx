import React, { FC, useState } from 'react'
import { Form, Button, Input, Divider } from 'antd'
import { Link, RouteComponentProps } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useApi } from '../utils/useServerApi'
import { TokenOperations } from '../utils/TokenOperations'

import'./Login.css'

interface RouteProps {
  route: RouteComponentProps,
  operator: TokenOperations,
}

const Login: FC<RouteComponentProps> = (props: RouteComponentProps) => {
//  每次转到登录页面时清除token
  const operator = new TokenOperations
  operator.delToken()

  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <div className="form-title-wrapper">
          <h3 className="form-title">js-questions 管理</h3>
          <Divider></Divider>
        </div>
         <LoginFrom route={props} operator={operator}></LoginFrom> 
      </div>
    </div>
  )
}

// Input组件focus状态下按enter机会提交表单，不用额外监听键盘事件
const LoginFrom: FC<RouteProps> = (props: RouteProps) => {
  // 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
  const [form] = Form.useForm()
  
  const initConfig: AxiosRequestConfig = { url: '', 
                                           params: {}
                                         }

  const [loginReqConfig, SetLoginConfig] = useState(initConfig)
  const loginRes: AxiosResponse<any> = useApi(loginReqConfig)

  const handleLoginRes = (res: AxiosResponse<any>): void => {
    if (res) {
      // 将token存入localStorage
      // 
      props.route.history.push('/regist')
    }
  }

  handleLoginRes(loginRes)

  const handleSumbit = () => {
    form.validateFields().then(values => {
      const { username, pwd } = values
      SetLoginConfig({
        url: '/login',
        params: {
          username,
          pwd
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    // form表单控制实例
    <Form
      form={form}
      onFinish={handleSumbit}
    >
      <Form.Item
        label="用户名"
        name="username" 
        rules={[
          { required: true,
            message: '请输入用户名' 
          }, {
            min: 5,
            max: 10,
            message: '用户名长度为5-10'
          }, {
            pattern: /^\w+$/g,
            message: '用户名只能是数字和字母组合'
          }]
        }
      >
        <Input 
        className="form-input" 
        placeholder="username"
        prefix={<UserOutlined  style={{ color: 'rgba(0,0,0,.25)' }} />} 
        />
      </Form.Item>
      <Form.Item
        label="密码"
        name="pwd"
        rules={[
          { required: true, 
            message: '请输入密码' 
          }, {
            min: 8,
            max: 15,
            message: '密码长度为8-15'
          }, {
            pattern: /^\w+$/g,
            message: '密码只能是数字和字母组合'
          }]}
      >
        <Input.Password className="form-input" placeholder="password" type="password" />
      </Form.Item>
      <Form.Item className="btn-wrapper">
        <Button type="primary" htmlType="submit">登 录</Button>
        <Button type="link">
          <Link to="/regist">注 册</Link>
        </Button>
      </Form.Item>
    </Form>
  )
}

export { Login }