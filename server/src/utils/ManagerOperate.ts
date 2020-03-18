import { DbOperate } from './DbOperate'
import { Mysql_config, init_mysql_config, manager_password_table } from '../config/mysql_config'

interface Manager {
  name: string,
  password: string,
  github: string
}

interface DataContainer {
  data: any
}

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
    try {
      if (this.connection && this.curDb === this.db) {
        // 插入到manager_info
        await this.connection.query(`INSERT INTO ?? VALUES ( ?, ?, ?);`, [`${this.tableName}_info`, null, manager.name,  manager.github], err => {
          if (err) throw err
          console.log(`${this.tableName} inserted, add ${manager.name} in manager table!`)
        })
        // 插入到manager_password
        await this.connection.query(`INSERT INTO ?? VALUES ( ?, ?, ?)`, [`${this.tableName}_password`, null, 'agagagda556', '6897sg'], err => {
          if (err) throw err
          console.log(`${this.tableName} pwd inserted, add ${manager.name} pwd in manager_pwd table!`)
        })
      }
    } catch(e) {
      console.error(e.message)
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
          o.data = rows[0]
        }).catch(err => {
          throw err
        })
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
}

const root: Manager = {
  name: 'root',
  password: 'C4(i,&V%I-9YBvcm',
  github: 'https://github.com/result17'
}

const container: DataContainer = {
  data: null
}
const main = async () => {
  const db = new ManagerOperate(init_mysql_config)
  db.connect().then(db => db.useDB()).then(db => db.selInfoByName('root', container)).then(db => db.end())
}
main()

export { ManagerOperate, Manager }
