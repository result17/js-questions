import * as fs from 'fs'
import vaild from './jsonVaild'

async function handleJsonUpload(path: string): Promise<boolean> {
  const data = JSON.parse(await (await fs.promises.readFile(path)).toString())
  const flag = vaild(data)
  await fs.promises.unlink(path)
  console.log(`Delect cache ${path} !`)
  return flag
}

handleJsonUpload('./upload_8b36f715b03abc4f3ec7a855f992f192')
// export default handleJsonUpload