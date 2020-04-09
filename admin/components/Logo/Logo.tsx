import React, { FC } from 'react'
import { FloatProperty, TextAlignProperty, UserSelectProperty } from 'csstype'

interface LogoProps {
  display?: string,
  float?: FloatProperty,
  width?: string,
  height?: string,
  bgMargin?: string,
  bgPadding?: string,
  background?: string,
  font?: string,
  fontSize?: string,
  fontColor?: string,
  fontFamily?: string,
  fontWeight?: number,
  textAlign?: TextAlignProperty,
  fontMargin?: string,
  fontPadding?: string,
  userSelect?: UserSelectProperty,
}

const Logo: FC<LogoProps> = (props: LogoProps) => {
  return (
    <div style={{ 
      display: props.display,
      background: props.background, 
      float: props.float,
      width: props.width,
      height: props.height,
      margin: props.bgMargin,
      padding: props.bgPadding,
      userSelect: props.userSelect,
    }}>
      <div style={{ 
        color: props.fontColor,
        fontFamily: props.fontFamily,
        fontWeight: props.fontWeight,
        fontSize: props.fontSize,
        textAlign: props.textAlign,
        margin: props.fontMargin,
        padding: props.fontPadding
      }}>{props.font}</div>
    </div>
  )
}

export { Logo, LogoProps }