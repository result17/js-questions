import { AuthState, AuthAction, AuthActionList, RoleList } from './type'

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionList.changeUser:
      return {
        role: action.role,
        user: action.user,
      }
    case AuthActionList.unAuth: 
      return {
        role: RoleList.logout,
        user: ''
      }
    default:
      return state
  }
}

export default reducer