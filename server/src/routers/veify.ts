import * as Router from 'koa-router'
import { HttpCode } from '../utils/Types'

interface VeifyRes {
  flag: 1
}

const veifyRouter = new Router()

veifyRouter.post('/veify', (ctx, next) => {
  // 通过验证中间件代表token合法
  const res: VeifyRes = { flag: 1 }
  ctx.response.body = res
  ctx.response.status = HttpCode.OK
  next()
  return
})

export { veifyRouter }