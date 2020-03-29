interface AuthProviderProps {
  children: JSX.Element | JSX.Element[],
  interface: string,
}

enum RoleList {
  root = 'ROOT',
  admin = 'ADMIN',
  user = 'USER',
  logout = 'LOGOUT',
  null = ''
}

type Role = RoleList.admin | RoleList.user | RoleList.root | RoleList.logout | RoleList.null

enum AuthActionList {
  changeUser = 'CHANGEUSER',
  unAuth = 'UNAUTH'
}

type AuthActionType = AuthActionList.changeUser | AuthActionList.unAuth

interface AuthAction {
  type: AuthActionType,
  role?: Role,
  user?: string,
}

interface AuthState {
  role: Role,
  user: string,
}


export { AuthProviderProps, RoleList, Role, AuthActionList, AuthAction, AuthState, AuthActionType }