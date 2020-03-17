import { Middleware } from 'koa'
import jwt from 'koa-jwt'
import * as path from 'path'
import { GetSecret } from '../config/GetSecret'

const verifyToken: Middleware = jwt(new GetSecret(path.resolve('..', 'config', 'secret.pub'))).unless({
  path: [/login/, /register/]
})

export { verifyToken }