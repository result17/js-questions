import { Middleware } from 'koa'
import * as jwt from 'koa-jwt'
import * as path from 'path'
import { GetSecret } from '../config/GetSecret'

const verifyToken: Middleware = jwt(new GetSecret(path.resolve(__dirname, '..', 'config', 'secret.pub'))).unless({
  path: [/login/, /regist/]
})

export { verifyToken }