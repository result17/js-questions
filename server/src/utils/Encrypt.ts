import * as crypto from 'crypto'

interface EncryptProvider {
  salt: string,
  mix: string,
}

class Encrypt {
  private static pwd: string
  constructor(pwd: string) {
    Encrypt.pwd = pwd
  }
  static getSalt(): string {
    // 取0-7
    const start = Math.floor(Math.random() * 8)
    // 随机范围为1-8，加上start取值范围为1-15
    const end = start + Math.ceil(Math.random() * 8)
    // bytes to base64 会多1/3的位数
    return crypto.randomBytes(12).toString('base64').slice(start, end)
  }
  getEncrypt(): EncryptProvider {
    const salt = Encrypt.getSalt()
    const mix = crypto.createHash('md5').update(`${Encrypt.pwd}${salt}`).digest('base64')
    return {
      salt,
      mix
    }
  }
  // 认证加密比较生成的hash是否相等
  verifyEncrypt(hash: string, salt: string): boolean { 
    return crypto.createHash('md5').update(`${Encrypt.pwd}${salt}`).digest('base64') === hash
  }
}

export { Encrypt, EncryptProvider }