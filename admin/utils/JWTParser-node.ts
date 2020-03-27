/* 客户端信任服务器返回的JWT json */
import { Roles } from '../components/AuthProvider'

interface JWTHeader {
  alg: string,
  type: string,
}

interface JWTPayload {
  username: string,
  role: Roles,
  // 签发时间（unix时间戳）
  iat: number,
  // token过时的时间戳
  exp: number,
  // 提供服务的服务器
  iss: string
}

interface parsedData {
  jwtHeader: JWTHeader,
  jwtPayload: JWTPayload,
  jwtsign: string
}

class JWTParser implements parsedData {
  static rawHeader: string
  static rawPayload: string
  public jwtsign: string
  public jwtHeader: JWTHeader
  public jwtPayload: JWTPayload
  constructor(token: string) {
    [JWTParser.rawHeader, JWTParser.rawPayload, this.jwtsign] = token.substring(7).split('.')
    this.jwtHeader = JWTParser.parseHeader()
    this.jwtPayload = JWTParser.parsePayload()
  }
  // 静态方法能直接调用静态属性
  static parseHeader() {
    const str = new Buffer(this.rawHeader, 'base64').toString()
    return JSON.parse(str) 
  }
  static parsePayload() {
    const str = new Buffer(this.rawPayload, 'base64').toString() 
    const temp = JSON.parse(str)
    // 将unix时间戳转换为JS时间戳
    try {
      temp.iat *= 1000
      temp.exp *= 1000
    } catch (e) {
      console.error(e)
    }
    return temp
  }
}

const jwt = new JWTParser('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJyb2xlIjoicm9vdCIsImlhdCI6MTU4NTMwODYzMywiZXhwIjoxNTg1NTY3ODMzLCJpc3MiOiJqcy1xdWVzdGlvbnMgc2VydmVyIn0.B5bti4d4RKoAufvIYGMeewUY7Mv5F2nzJgiIV_ZF9uI')
console.log(jwt)