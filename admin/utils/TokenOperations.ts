class TokenOperations {
  private ls: Storage
  constructor() {
    this.ls = localStorage
  }
  setToken(token: string): TokenOperations {
    this.ls.setItem('token', token)
    return this
  }
  delToken(): TokenOperations {
    this.ls.removeItem('token')
    return this
  }
  hasToken(): Boolean {
    return !!this.ls.getItem('token')
  }
}

export { TokenOperations }