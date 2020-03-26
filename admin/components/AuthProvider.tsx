import React, { createContext, FC, useState } from 'react'

type Roles  = 'root' | 'adimin' | 'user' | 'logout'

interface AuthContextVal {
  isLogin: boolean,
  // token？
  role: Roles,
  logout: () => void,
  login: (role: Roles) => void,
}

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[]
}

const AuthContext = createContext({
  isLogin: false,
  role: 'user',
  logout: () => {},
  login: (role: Roles) => {}
})
AuthContext.displayName = 'AuthContext'

const AuthProvider: FC<AuthProviderProps> = (props: AuthProviderProps) => {
  const logout = () => {
    setAuthInfo({
      ...authInfo,
      isLogin: false,
      role: 'logout'
    })
  }
  const login = (role: Roles) => {
    setAuthInfo({
      ...authInfo,
      isLogin: true,
      role: role
    })
  }
  const defaultVal: AuthContextVal = {
    isLogin: false,
    role: 'logout',
    logout: logout,
    login: login
  }

  const [authInfo, setAuthInfo] = useState(defaultVal)

  return (<AuthContext.Provider value ={ defaultVal }>
    { props.children }
  </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext, Roles }