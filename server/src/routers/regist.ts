import * as Router from 'koa-router'
import { init_mysql_config } from '../config/mysql_config'
import { HttpCode } from '../utils/Types'
import { ManagerOperate, Manager } from '../utils/ManagerOperate' 
import { Encrypt } from '../utils/Encrypt'

interface RegistRes {
  flag: 0 | 1,
  msg: string
}

const registRouter = new Router()

registRouter.post('/regist', async (ctx, next) => {
  const { username, pwd, githubUsername } = ctx.request.body
  console.log(ctx.request.body)
  if (!username || !pwd || !githubUsername) {
    const res: RegistRes = {
      flag: 0,
      msg: 'params error!'
    }
    ctx.response.body = res
    ctx.response.status = HttpCode.BADREQUEST
    next()
    return
  }

  const database = new ManagerOperate(init_mysql_config)
  await database.connect()
  await database.useDB()
  try {
    const encrypt = new Encrypt(pwd)
    const { mix, salt } = encrypt.getEncrypt()
    const manager: Manager = {
      name: username,
      mix: mix,
      github: githubUsername,
      salt: salt
    }
    await database.addManager(manager)
  } catch(e){
    const res: RegistRes = {
      flag: 0,
      msg: 'database error!'
    }
    console.error(e.message)
    ctx.response.body = res
    ctx.response.status = HttpCode.BADREQUEST
    next()
    return
  }
  const res: RegistRes = {
    flag: 1,
    msg: 'Add manager successed'
  }
  ctx.response.body = res
  ctx.response.status = HttpCode.OK
  next()
  return
})

export { registRouter }