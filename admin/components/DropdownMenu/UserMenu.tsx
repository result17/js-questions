import React, { FC, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Menu } from 'antd'
import { AuthContext } from '../AuthProvider/index'
import { AuthActionList } from '../AuthProvider/types'
import { tokenOperations } from '../../utils/TokenOperations'

const UserMenu: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const auth = useContext(AuthContext)
  const handleLogout = () => {
    auth.dispatch({
      type: AuthActionList.unAuth
    })
    props.history.push('/')
    tokenOperations.delToken()
  }

  return (
    <Menu>
      <Menu.Item key="user_role">角色：{ auth.state.role }</Menu.Item>
      <Menu.Item key="doc">
        <a 
          target="_blank"
          href="https://github.com/result17/js-questions" 
          rel="noopener noreferrer"
        >
          使用文档
        </a>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item 
        key="logout"
        onClick={ handleLogout }
      >
        退出登录
      </Menu.Item>
    </Menu>
  )
}

export default UserMenu