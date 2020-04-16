import * as Router from 'koa-router'
import { HttpCode } from '../utils/Types'
import { QuestionsOperate } from '../utils/QuestionsOperate'
import { init_mysql_config } from '../config/mysql_config'

interface QuestionInfoRes<T> {
  // fail or success
  flag: 0 | 1,
  list: T[]
}

const questionInfoRouter = new Router()

questionInfoRouter.post('/questionInfo', async (ctx, next) => {
  try {
    const db = new QuestionsOperate(init_mysql_config)
    await db.connect()
    await db.useDB()
    const infoList = await db.getQuestionInfoList()
    await db.end()
    const res: QuestionInfoRes<any> = {
      flag: 1,
      list: infoList
    }
    ctx.response.body = res
    ctx.response.status = HttpCode.OK
    next()
    return
  } catch (e) {
    console.error(e)
    const res: QuestionInfoRes<null> = {
      flag: 0,
      list: []
    }
    ctx.response.body = res
    ctx.response.status = HttpCode.BADREQUEST
    next()
    return
  }
})

export { questionInfoRouter }