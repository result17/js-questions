import * as fs from 'fs'
import valid from './jsonValid'
import { QuestionsOperate } from './QuestionsOperate'

async function handleJsonUpload(path: string): Promise<boolean> {
  const data = JSON.parse(await (await fs.promises.readFile(path)).toString())
  const flag = valid(data)
  if (flag) {
    const db = new QuestionsOperate()
    await db.connect()
    await db.useDB()
    await db.addQuestions({
      lever: data.data.lever,
      name: data.data.name,
      author: data.data.author,
      questions: data.data.questions
    })
    await db.end()
  }
  await fs.promises.unlink(path)
  console.log(`Delect cache ${path} !`)
  return flag
}

export default handleJsonUpload

