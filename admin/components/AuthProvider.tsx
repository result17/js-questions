import React, { createContext, FC, useState } from 'react'

// 写成全局的enum
type Roles  = 'root' | 'admin' | 'user' | 'logout'

interface AuthContextVal {
  isLogin: boolean,
  // token？
  role: Roles,
  setLogout: () => void,
  setLogin: (role: Roles) => void,
}

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[]
}

const AuthContext = createContext({
  isLogin: false,
  role: 'user' as Roles,
  setLogout: () => {},
  setLogin: (role: Roles) => {}
})
AuthContext.displayName = 'AuthContext'

const AuthProvider: FC<AuthProviderProps> = (props: AuthProviderProps) => {
  const setLogout = () => {
    setAuthInfo({
      ...authInfo,
      isLogin: false,
      role: 'logout'
    })
  }
  const setLogin = (role: Roles) => {
    setAuthInfo({
      ...authInfo,
      isLogin: true,
      role: role
    })
  }
  const defaultVal: AuthContextVal = {
    isLogin: false,
    role: 'logout',
    setLogout: setLogout,
    setLogin: setLogin
  }

  const [authInfo, setAuthInfo] = useState(defaultVal)

  return (<AuthContext.Provider value ={ defaultVal }>
    { props.children }
  </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext, Roles }