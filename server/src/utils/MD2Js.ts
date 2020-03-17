import * as fs from 'fs'
import * as path from 'path'
import { ScrapeMDOption, ScrapeMD } from './ScrapeMD'

interface MD2JsOption extends ScrapeMDOption {
  jsPath: string
}

class MD2Js extends ScrapeMD {
  private jsPath: string
  constructor(option: MD2JsOption) {
    super(option)
    this.jsPath = option.jsPath
  }
  async saveInjs() {
    if (this.jsPath) {
      const data = await this.fetchMD()
      try {
        fs.writeFile(this.jsPath,
          `export default ${JSON.stringify(
            data,
            null,
            2
          )}`, 
          err => {
            if (err) throw err
            console.log('Saved')
          })
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

const option: MD2JsOption = {
  method: 'GET',
  MDurl: 'https://raw.githubusercontent.com/result17/blog/master/others/js-question-zh.md',
  jsPath: path.resolve('.', 'src', 'data', 'index.js')
}

let test = new MD2Js(option)
test.saveInjs()