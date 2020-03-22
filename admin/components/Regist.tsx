import React, { FC, useState, useEffect } from 'react'
import { Form, Button, Divider, Input, Popover } from 'antd'
import { UserOutlined, GithubOutlined } from '@ant-design/icons'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useApi } from '../utils/useServerApi'
import { AxiosResponse } from 'axios'

import'./Regist.css'

interface registData {
  username: string,
  pwd: string,
  githubUsername: string,
  // timestamp
  create_at: number
}

const Regist: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <div className="regist-wrapper">
      <div className="regist-form-wrapper">
         <div className="regist-form-title-wrapper">
           <h3 className="regist-form-title">注册账号</h3>
           <Divider></Divider>
         </div>
         <RegistForm></RegistForm>
      </div>
    </div>
  )
}

const RegistForm: FC = () => {
  const [form] = Form.useForm()
  const initRegistData: registData = {
                                       username: '',
                                       pwd: '',
                                       githubUsername: '',
                                       create_at: 0
                                     }
  
  const [registReqConfig, setRegistReqConfig] = useState({
                                                            url: '/regist',
                                                            data: initRegistData
                                                         })
  
  const content: JSX.Element = (
    <div>
      <p style={{ marginBottom: '0.5em' }}>确认无误后即可提交</p>
    </div>
  )
  
  const registRes: AxiosResponse<any> = useApi(registReqConfig)

  useEffect(() => {
    if (registRes) {
      if (registRes.status === 200 && registRes.data.flag === 1) {
        // 服务器通知完成注册后
      }
    }
  }, [registRes])
  
  const handleSumbit = () => {
    form.validateFields().then(values => {
      const { username, pwd, githubUsername } = values
      if (username !== registReqConfig.data.username || pwd !== registReqConfig.data.pwd || githubUsername !== registReqConfig.data.githubUsername) {
        setRegistReqConfig({
          ...registReqConfig,
          data: {
            username,
            pwd,
            githubUsername,
            create_at: Date.now()
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Form
      form={form}
      style={{textAlign: 'center'}}
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
      <Form.Item
        label="确认密码"
        name="confirm"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: '请确认密码'
          }, ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('两次输入的密码不匹配')
            }
          })
        ]}
      >
        <Input.Password placeholder="confirm password"/>
      </Form.Item>
      <Form.Item
        label="github用户名"
        name="githubUserName"
        rules={[{
          required: true,
          message: '输入GitHub用户名'
        },{
          pattern: /^\w+$/g,
          message: '输入正确的GitHub用户名'
        }]}
      >
        <Input 
          placeholder="github page"
          prefix={<GithubOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
        />
      </Form.Item>
      <Form.Item style={{ marginTop: '50px', marginBottom: '0', display: 'inline-block' }}>
        <Popover
          content={content}
        >
          <Button 
            type="primary"
            htmlType="submit"
          >提 交</Button>
        </Popover>
        <Button type="link" style={{ display: 'block' }}>
          <Link to="/login">登录</Link>
        </Button>
      </Form.Item>
    </Form>
  )
}

export { Regist }