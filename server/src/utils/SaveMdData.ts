import * as fs from 'fs'
import * as path from 'path'
import { ScrapeMDOption, ScrapeMD } from './ScrapeMD'

interface SaveOption extends ScrapeMDOption {
  jsPath?: string,
  jsonPath?: string
}

class SaveMdData extends ScrapeMD {
  private jsPath: string
  private jsonPath: string
  constructor(option: SaveOption) {
    super(option)
    this.jsPath = option.jsPath
    this.jsonPath = option.jsonPath
  }
  async saveInjs() {
    if (this.jsPath) {
      const data = await this.fetchMD()
      try {
        fs.writeFile(this.jsPath,
          `export default ${JSON.stringify(data, null, 2)}`, 
          err => {
            if (err) throw err
            console.log('Saved！')
          })
      } catch (e) {
        throw new Error(e)
      }
    } else {
      console.log('Check your js path!')
    }
  }
  // 需要调整深入空格
  async saveInJson() {
    if (this.jsonPath) {
      const data = await this.fetchMD()
      try {
        fs.writeFile(this.jsonPath, 
          `{
            "data": {
              "questions": ${JSON.stringify(data, null, 2)}
            }
          }`, 
          err => {
            if (err) throw err
            console.log('Saved！')
          })
      } catch (e) {
        throw new Error(e)
      }
    } else {
      console.log('Check your json path!')
    }
  }
}

const main = async () => {
  const option: SaveOption = {
    method: 'GET',
    MDurl: 'https://raw.githubusercontent.com/result17/blog/master/others/js-question-zh.md',
    jsonPath: path.resolve('..', 'data', 'js_quiz.json')
  }
  const download = new SaveMdData(option)
  await download.saveInJson()
  console.log('Done!')
}
main()

// export { SaveOption, SaveMdData }