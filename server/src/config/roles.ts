const roles = (n: number): 'root' | 'admin' | 'user' => {
  let role: string = ''
  switch (n) {
    case 0:
      role = 'root'
      break
    case 1:
      role = 'admin'
      break
    case 2:
      role = 'user'
      break
    default:
      role = 'user'
      break
  }
  return role as "root" | "admin" | "user"
} 

export { roles }