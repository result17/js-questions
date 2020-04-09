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
  // const { name, type, size } = file
  // if (type === FileType.json &&fileNameCheck(name, 'json')) {
  //   handleJsonUpload(file)
  // } else {
  //   const res: UploadRes = {
  //     flag: 0,
  //     msg: 'filename error!',
  //     isFileNameMatch: false,
  //     isFileContextMatch: false,
  //   }
  //   ctx.response.body = res
  //   ctx.response.status = HttpCode.BADREQUEST
  //   next()
  //   return 
  // }
})

export { uploadRouter }