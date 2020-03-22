import React, { FC, useState, useEffect } from 'react'
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
      <div className="login-form-wrapper">
        <div className="login-form-title-wrapper">
          <h3 className="login-form-title">js-questions 管理</h3>
          <Divider></Divider>
        </div>
         <LoginForm route={props} operator={operator}></LoginForm> 
      </div>
    </div>
  )
}

// Input组件focus状态下按enter机会提交表单，不用额外监听键盘事件
const LoginForm: FC<RouteProps> = (props: RouteProps) => {
  // 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
  const [form] = Form.useForm()
  const initConfig: AxiosRequestConfig = { 
                                            url: '/login', 
                                            data: {}
                                         }

  const [loginReqConfig, SetLoginConfig] = useState(initConfig)

  const loginRes: AxiosResponse<any> = useApi(loginReqConfig)
  
  const handleSumbit = () => {
    form.validateFields().then(values => {
      const { username, pwd } = values
      // 验证表单输入是否跟之前的输入相同
      if (username !== loginReqConfig.data.username || pwd !== loginReqConfig.data.pwd) {
        SetLoginConfig({
          ...loginReqConfig,
          data: {
            username,
            pwd
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  /* 组件会刷新两次，第一次一次在setLoginConfig马上刷新。
  因为axios是异步请求，所以返回的loginRes还是原来的loginRes。
  当axios请求完接口，有新的返回时，useApi再次让组件re-render，才会有正确的loginRes */
 
  useEffect(() => {
    if (loginRes) {
      if (loginRes.status === 200 && loginRes.data.flag === 1) {
        props.operator.setToken(loginRes.data.token)
        props.route.history.push('/regist')
      }
    }
  }, [loginRes])

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
            min: 4,
            max: 15,
            message: '用户名长度为4-15'
          }, {
            pattern: /^\w+$/g,
            message: '用户名只能是数字和字母组合'
          }]
        }
      >
        <Input 
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
          }]
        }
      >
        <Input.Password placeholder="password" />
      </Form.Item>
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit"
        >登 录
        </Button>
        <Button type="link">
          <Link to="/regist">注 册</Link>
        </Button>
      </Form.Item>
    </Form>
  )
}

export { Login }