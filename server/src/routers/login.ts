import * as path from 'path'
import * as Router from 'koa-router'
import { init_mysql_config } from '../config/mysql_config'
import { ManagerOperate, DataContainer } from '../utils/ManagerOperate' 
import { Encrypt } from '../utils/Encrypt'
import { JSTypes, HttpCode } from '../utils/Types'
import { Token } from '../utils/Token'

// flag代表有没有通过后端验证
interface LoginRes {
  flag: 0 | 1,
  msg: string,
  token?: string,
}

const loginRouter = new Router()

loginRouter.post('/login', async (ctx, next) => {
  // bodyparse分卸请求体
  const { username, pwd } = ctx.request.body
  // console.log(ctx.request.body)

  if (!username || !pwd) {
    const res: LoginRes = {
      flag: 0,
      msg: 'params error!'
    }
    ctx.response.body = res
    ctx.response.status = HttpCode.BADREQUEST
    next()
    return
  }

  const database = new ManagerOperate(init_mysql_config)
  const idCon: DataContainer =  { data: null }
  const mixCon: DataContainer = { data: null }
  
  await database.connect()
  await database.useDB()
  // 此函数有副作用修改container的data属性，data = rows[0]
  await database.selInfoByName(username, idCon)

  if (idCon.data.id && typeof idCon.data.id === JSTypes.number && !Number.isNaN(idCon.data.id)) {
    await database.selMixandSaltByID(idCon.data.id as number, mixCon)
    if (mixCon.data.mix && mixCon.data.salt && typeof mixCon.data.mix === JSTypes.string && typeof mixCon.data.salt === JSTypes.string) {
      const encrypt = new Encrypt(pwd)
      if (encrypt.verifyEncrypt(mixCon.data.mix, mixCon.data.salt)) {
         const token = new Token({ username }, path.resolve(__dirname, '..', 'config', 'secret.pub'), {expiresIn: '1d'})
         const res: LoginRes = {
           flag: 1,
           msg: 'Login successed!',
           token: token.getToken()
         }
         ctx.response.body = res
         ctx.response.status = HttpCode.OK
         next()
         return
      } else {
        const res: LoginRes = {
          flag: 0,
          msg: 'Login failed!'
        }
        ctx.response.body = res
        ctx.response.status = HttpCode.UNAUTHORIZED
        next()
        return
      }
    }
  } else {
    const res: LoginRes = {
      flag: 0,
      msg: 'Username is not exist.'
    }
    ctx.response.body = res
    ctx.response.status = HttpCode.NOTFOUND
    next()
    return
  }

})

export { loginRouter }

class A {
  constructor(n) {
    this.r = n
  }
}

class B extends A(n) {
  
}