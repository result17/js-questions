import Koa from 'koa'
import Router from 'koa-router'
import cors from 'koa2-cors' 
import bodyParser from 'koa-bodyparser'
import { unauthHandler } from './middlewares/unauthHandler'
import { verifyToken } from './middlewares/verifyToken'

const admin = new Koa()
const router = new Router()

admin.use(cors() as any)
admin.use(bodyParser({}))

admin.use(unauthHandler)
admin.use(verifyToken)

export { admin }