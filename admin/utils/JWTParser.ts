/* 客户端信任服务器返回的JWT json */
import { Role } from '../components/AuthProvider/index'

interface JWTHeader {
  alg: string,
  type: string,
}

interface JWTPayload {
  username: string,
  role: Role,
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
    return JSON.parse(atob(this.rawHeader)) 
  }
  static parsePayload() {
    const temp = JSON.parse(atob(this.rawPayload))
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

export default JWTParser