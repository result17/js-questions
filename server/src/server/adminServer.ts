import * as Koa from 'koa'
import * as cors from 'koa2-cors' 
import * as bodyParser from 'koa-bodyparser'
import { unauthHandler } from '../middlewares/unauthHandler'
import { verifyToken } from '../middlewares/verifyToken'
import { loginRouter } from '../routers/login'

const admin = new Koa()

admin.use(cors())
admin.use(bodyParser({}))

admin.use(unauthHandler)
admin.use(verifyToken)

admin.use(loginRouter.routes())

export { admin }