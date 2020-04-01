import React, { FC, useContext } from 'react'
import { Dropdown, Button } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import UserMenu from './UserMenu'
import { AuthContext } from '../AuthProvider/index'

const DropdownMenu: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const auth = useContext(AuthContext)

  return (
    <Dropdown 
      overlay={<UserMenu { ...props }></UserMenu>} 
    >
      <Button size={'large'} style={{ height: '64px', padding: '6.4px 25px', borderRadius: '4px'}} >{ auth.state.user }</Button>
    </Dropdown>
  )
}

export default DropdownMenu