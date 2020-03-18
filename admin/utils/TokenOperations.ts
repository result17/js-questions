class TokenOperations {
  private ls: Storage
  constructor() {
    this.ls = localStorage
  }
  setToken(token: string): void {
    this.ls.setItem('token', token)
  }
  delToken(): void {
    this.ls.removeItem('token')
  }
  hasToken(): Boolean {
    return !!this.ls.getItem('token')
  }
  getToken(): string {
    return this.ls.getItem('token')
  }
}

export { TokenOperations }