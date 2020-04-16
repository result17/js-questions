import * as Router from 'koa-router'
import { HttpCode } from '../utils/Types'
import { QuestionsOperate } from '../utils/QuestionsOperate'
import { init_mysql_config } from '../config/mysql_config'
import checkParams from '../utils/checkParams'

interface QuestionDataRes<T> {
  flag: 0 | 1,
  source: T
}

const questionDataRouter = new Router()
// limit to do
questionDataRouter.post('/questionData', async(ctx, next) => {
  if (checkParams(Number(ctx.query.id))) {
    try {
      const db = new QuestionsOperate(init_mysql_config)
      await db.connect()
      await db.useDB()
      // 坑：query会转为字符串
      const data = await db.getQuestionDataByid(Number(ctx.query.id))
      await db.end()
      const res: QuestionDataRes<any> = {
        flag: 1,
        source: data[0]
      }
      ctx.response.body = res
      ctx.response.status = HttpCode.OK
      next()
      return
    } catch(e) {
      console.error('database error！')
    }
  } 
  const res: QuestionDataRes<null> = {
    flag: 0,
    source: null
  }
  ctx.response.body = res
  ctx.response.status = HttpCode.BADREQUEST
  next()
  return
})

export { questionDataRouter }