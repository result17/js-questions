import { GetSecret } from '../config//GetSecret'
import * as jwt from 'jsonwebtoken'

interface PayloadType {
  username?: string
}

class Token {
  payload: PayloadType
  private secret: string | Buffer
  option: jwt.SignOptions
  constructor(payload: PayloadType, secretPath: string, option: jwt.SignOptions = {}) {
    this.payload = payload
    this.secret = new GetSecret(secretPath).secret
    this.option = option
  }
  getToken(): string {
    return `Bearer ${jwt.sign(this.payload, this.secret, this.option)}`
  }
}

class Payload {
  private secret: string | Buffer
  private token : string
  constructor (token: string, secret: string) {
    this.token = token
    this.secret = secret
  }
  parsePayload() {
    return jwt.verify(this.token.split(' ')[1], this.secret)
  }
}

export { Token, Payload, PayloadType }
