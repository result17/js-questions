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

/* 
show  代表是否需要渲染AuthNotificater（靠token判断）
isVerifing 代表是否在检验中
succeed 代表检验是否通过
*/
interface verifyState {
  show: boolean,
  isVerifing: boolean,
  succeed: boolean,
}

export { AuthProviderProps, RoleList, Role, AuthActionList, AuthAction, AuthState, AuthActionType, verifyState }