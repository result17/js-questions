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
  connect(): ManagerOperate {
    super.connect()
    return this
  }
  useDB(): ManagerOperate {
    super.useDB()
    return this
  }
  createTable(tableName: string): ManagerOperate {
    super.createTable(tableName)
    return this
  }
  addManager(manager: Manager): ManagerOperate {
    try {
      if (this.connection && this.curDb === this.db) {
        // 插入到manager_info
        this.connection.query(`INSERT INTO ?? VALUES ( ?, ?, ?);`, [`${this.tableName}_info`, null, manager.name,  manager.github], err => {
          if (err) throw err
          console.log(`${this.tableName} inserted, add ${manager.name} in manager table!`)
        })
        // 插入到manager_password
        this.connection.query(`INSERT INTO ?? VALUES ( ?, ?, ?)`, [`${this.tableName}_password`, null, 'agagagda556', '6897sg'], err => {
          if (err) throw err
          console.log(`${this.tableName} pwd inserted, add ${manager.name} pwd in manager_pwd table!`)
        })
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  rmManager(id: number): ManagerOperate {
    try {
      if (this.connection && this.curDb === this.db) {
        this.connection.query(`DELETE FROM ?? WHERE id = ?`, [this.tableName, id], err => {
          if (err) throw err
          console.log(`id: ${id} manager deleted!`)
        })
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  selInfoByName(name: string, o: DataContainer): ManagerOperate {
    try {
      if (this.connection && this.curDb === this.db) {
        o.data = this.connection.query(`SELECT id FROM ?? WHERE ${this.tableName}name = ?`, [`${this.tableName}_info`, name], err => {
          if (err) throw err
          console.log(`name: ${name} manager found, data is in the DataContainer.`)
        })[0]
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

const db = new ManagerOperate(init_mysql_config)
db.connect().useDB().createTable(manager_password_table).selInfoByName('root', container).end()
console.log(container)

export { ManagerOperate, Manager }
