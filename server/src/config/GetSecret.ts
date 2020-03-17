import * as fs from 'fs'

class GetSecret {
  public secret: string | Buffer
  constructor(path, encoding = 'utf8') {
    this.secret = fs.readFileSync(path, {encoding: encoding})
  }
}

export { GetSecret }