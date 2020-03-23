import * as moment from 'moment'
import { DbOperate } from './DbOperate'
import { Mysql_config } from '../config/mysql_config'

interface Manager {
  name: string,
  mix: string,
  github: string,
  salt: string,
}

interface DataContainer {
  data: any
}

moment.locale('zh-cn')

class ManagerOperate extends DbOperate {
  public readonly tableName: string = 'manager'
  constructor(config: Mysql_config) {
    super(config)
  }
  async connect(): Promise<ManagerOperate> {
    await super.connect()
    return this
  }
  async useDB(DbName: string = this.db): Promise<ManagerOperate> {
    await super.useDB()
    return this
  }
  async createTable(tableName: string): Promise<ManagerOperate> {
    await super.createTable(tableName)
    return this
  }
  async addManager(manager: Manager): Promise<ManagerOperate> {
    // 不再在此捕获错误，应该调用函数时捕获
    if (this.connection && this.curDb === this.db) {
      // 插入到manager_info(现在只开放type=1的用户进行注册), 
      await this.connection.promise().query(`INSERT INTO ?? VALUES ( ?, ?, ?, ?, ?);`, [`${this.tableName}_info`, null, manager.name,  1,  manager.github, moment().format('YYYY-MM-DD hh:mm:ss')]).then(() => {
        console.log(`${this.tableName} inserted, add ${manager.name} in manager table!`)
      }).catch(err => {
        throw err
      })
      // 插入到manager_password
      await this.connection.promise().query(`INSERT INTO ?? VALUES ( ?, ?, ?)`, [`${this.tableName}_mix`, null, manager.mix, manager.salt]).then(() => {
        console.log(`${this.tableName} mix inserted, add ${manager.name}_mix in manager_mix table!`)
      }).catch(err => {
        throw err
      })
    }
    return this
  }
  async rmManager(id: number): Promise<ManagerOperate> {
    try {
      if (this.connection && this.curDb === this.db) {
        await this.connection.query(`DELETE FROM ?? WHERE id = ?`, [this.tableName, id], err => {
          if (err) throw err
          console.log(`id: ${id} manager deleted!`)
        })
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  async selInfoByName(name: string, o: DataContainer): Promise<ManagerOperate> {
    try {
      if (this.connection && this.curDb === this.db) {
        await this.connection.promise().query(`SELECT id FROM ?? WHERE ${this.tableName}name = ?`, [`${this.tableName}_info`, name]).then(([rows, fields]) => {
          o.data = rows.length ? rows[0] : null
          console.log(`name: ${name} manager found, data is in the DataContainer.`)
        }).catch(err => {
          throw err
        })
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  async selMixandSaltByID(id: number, o: DataContainer): Promise<ManagerOperate> {
    if (this.connection && this.curDb === this.db) {
      await this.connection.promise().query(`SELECT mix, salt FROM ?? WHERE ${this.tableName}_id = ?`, [`${this.tableName}_mix`, id]).then(([rows, fields]) => {
        o.data = rows.length ? rows[0] : null
        console.log(`id: ${id} manager found, data is in the DataContainer.`)
      }).catch(err => {
        console.error(err.message)
      })
    }
    return this
  }
}

export { ManagerOperate, Manager, DataContainer }
