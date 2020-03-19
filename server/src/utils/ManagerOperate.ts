import { DbOperate } from './DbOperate'
import { Mysql_config, init_mysql_config } from '../config/mysql_config'

interface Manager {
  name: string,
  mix: string,
  github: string,
  salt: string,
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
        await this.connection.promise().query(`INSERT INTO ?? VALUES ( ?, ?, ?);`, [`${this.tableName}_info`, null, manager.name,  manager.github]).then(() => {
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
}

const root: Manager = {
  name: 'root',
  // pwd: '20190319',
  mix: 'Olp5Ia5KUg+5YioOaPml0g==',
  github: 'https://github.com/result17',
  salt: 'CBBYJGzfBvEeHI+/vBPcKA=='
}

const container: DataContainer = {
  data: null
}
const main = async () => {
  const database = new ManagerOperate(init_mysql_config)
  await database.connect().then(db => db.useDB()).then(db => db.addManager(root)).then(db => db.end())
  console.log('finish')
}
main()

export { ManagerOperate, Manager }
