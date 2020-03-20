/* koa中间件用域劫持Token
https://github.com/koajs/jwt
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/401
*/
import { Middleware } from 'koa'

import { HttpCode } from '../utils/Types'

const unauthHandler: Middleware = async (ctx, next) => {
  return await next().catch(err => {
    if (HttpCode.UNAUTHORIZED === err.Status) {
      ctx.response.status = HttpCode.UNAUTHORIZED
      ctx.response.body = {
        code: 401,
        data: {
          msg: 'Unauthorized, use Authorization header to get access.\n'
        }
      }
    } else {
      throw err
    }
  })
}

export { unauthHandler }