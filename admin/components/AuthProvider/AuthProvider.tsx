import React, { createContext, FC, useReducer, useEffect, useState, useRef } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AuthProviderProps, AuthState, RoleList, AuthActionList, Role } from './type'
import reducer from './reducer'
import { useApi } from '../../utils/useApi'
import { TokenOperations } from '../../utils/TokenOperations'
import JWTParser from '../../utils/JWTParser'

// 全局共享role和user，null只为了初始化，无实际意义
const initialAuthState: AuthState = {
  role: RoleList.null,
  user: '',
}

const AuthContext = createContext(null)

const AuthProvider: FC<AuthProviderProps> = (props: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState)
  const initVeifyReqConfig: AxiosRequestConfig = { url: '' }
  const [veifyReqConfig, setVeifyReqConfig] = useState(initVeifyReqConfig)
  const veifyRes: AxiosResponse<any> = useApi(veifyReqConfig)
  const tokenContainer = useRef(new TokenOperations())
  
   /* 
      请求组件props上的veify interface;
      存在token的话：
      验证token是否被更改；
      验证通过则设置role为token中对应的token；
      不通过则删除token，role变更为logout;
      不存在token的话：
      则直接设置角色为logout
   */

  useEffect(() => {
    if (tokenContainer.current.hasToken()) {
      setVeifyReqConfig({ url: props.interface })
    } else {
      dispatch({
        type: AuthActionList.unAuth,
      })
    }
  }, [])  

  useEffect(() => {
    if (veifyRes) {
      if (veifyRes.status === 200 && veifyRes.data.flag === 1) {
        // 通过验证，解析token
        const jwtParser = new JWTParser(tokenContainer.current.getToken())
        dispatch({
          type: AuthActionList.changeUser,
          role: (jwtParser.jwtPayload.role.toUpperCase()) as Role,
          user: jwtParser.jwtPayload.username,
        })
      } else if (veifyRes.status === 401) {
        // tokenContainer.current.delToken()
        dispatch({
          type: AuthActionList.unAuth,
        })
      }
    }
  }, [veifyRes])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      { props.children }
    </AuthContext.Provider>
  )
}

export  { AuthProvider, AuthContext }

