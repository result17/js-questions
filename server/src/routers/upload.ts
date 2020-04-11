import * as Router from 'koa-router'
import fileNameCheck from '../utils/fileNameCheck'
import { HttpCode, FileType } from '../utils/Types'
import handleJsonUpload from '../utils/handleJsonUpload'

interface UploadRes {
  flag: 0 | 1,
  msg: string,
  isFileNameMatch: boolean,
  isFileContextMatch: boolean,
}

const uploadRouter = new Router()

uploadRouter.post('/uploadData', async (ctx, next) => {
  const file = Object.values(ctx.request.files)[0]
  const { name, type, size, path } = file
  console.log(name, type)
  if (type === FileType.json && fileNameCheck(name, 'json')) {
    const flag = await handleJsonUpload(path)
    if (flag) {
      const res: UploadRes = {
        flag: 1,
        msg: 'Add question!',
        isFileNameMatch: true,
        isFileContextMatch: true,
      }
      ctx.response.body = res
      ctx.response.status = HttpCode.OK
      next()
      return
    } else {
      const res: UploadRes = {
        flag: 0,
        msg: 'filecontext error!',
        isFileNameMatch: true,
        isFileContextMatch: false,
      }
      ctx.response.body = res
      ctx.response.status = HttpCode.BADREQUEST
      next()
      return
    }
  } else {
    const res: UploadRes = {
      flag: 0,
      msg: 'filename error!',
      isFileNameMatch: false,
      isFileContextMatch: false,
    }
    ctx.response.body = res
    ctx.response.status = HttpCode.BADREQUEST
    next()
    return 
  }
})

export { uploadRouter }