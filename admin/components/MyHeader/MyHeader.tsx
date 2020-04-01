import React, { FC } from 'react'
import { Logo, LogoProps } from '../Logo/Logo'
import { RouteComponentProps } from 'react-router-dom'
import DropdownMenu from '../DropdownMenu/DropdownMenu'

const logoProps: LogoProps =  {
  width: '48px',
  height: '48px',
  bgMargin: '8px 0px 8px',
  background: '#ECDC49',
  userSelect: 'none',
  font: 'JS',
  fontColor: '#242621',
  fontFamily: '\'Roboto\', sans-serif',
  fontWeight: 900,
  fontSize: '24px',
  textAlign: 'right',
  fontPadding: '0px 5px 0px'
}

const MyHeader:FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <>
      <div style={{ float: 'left' }}>
        <Logo { ...logoProps }></Logo>
      </div>
      <div style={{ float: 'right' }}>
        <DropdownMenu {...props}></DropdownMenu>
      </div>
    </>
  )
}

export default MyHeader