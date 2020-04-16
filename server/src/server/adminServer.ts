import * as Koa from 'koa'
import * as cors from 'koa2-cors' 
import * as bodyParser from 'koa-body'
import { unauthHandler } from '../middlewares/unauthHandler'
import { verifyToken } from '../middlewares/verifyToken'
import { loginRouter } from '../routers/login'
import { registRouter } from '../routers/regist'
import { veifyRouter } from '../routers/veify'
import { uploadRouter } from '../routers/upload'
import { questionInfoRouter } from '../routers/questionInfo'
import { questionDataRouter } from '../routers/questionData'

const admin = new Koa()

admin.use(cors())
admin.use(bodyParser({
  multipart: true,
  encoding: 'utf-8',
  formidable: {
    maxFileSize: 1024 * 2048,
    multiples: true,
  }
}))

admin.use(unauthHandler)
admin.use(verifyToken)

admin.use(loginRouter.routes())
admin.use(registRouter.routes())
admin.use(veifyRouter.routes())
admin.use(uploadRouter.routes())
admin.use(questionInfoRouter.routes())
admin.use(questionDataRouter.routes())

export { admin }