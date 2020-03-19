import crypto from 'crypto'

class Encrypt {
  private static pwd: string
  constructor(pwd: string) {
    Encrypt.pwd = pwd
  }
  static getSaltMixin(): string {
    // 取0-7
    const start = Math.floor(Math.random() * 8)
    // 随机范围为1-8，加上start取值范围为1-15
    const end = start + Math.ceil(Math.random() * 8)
    // bytes to base64 会多1/3的位数
    return Encrypt.pwd + crypto.randomBytes(12).toString('base64').slice(start, end)
  }
  getEncrypt(): string {
    return crypto.createHash('md5').update(`${Encrypt.getSaltMixin()}`).digest('base64')
  } 
}

export { Encrypt }