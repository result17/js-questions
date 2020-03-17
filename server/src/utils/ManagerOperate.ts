import { DbOperate } from './DbOperate'
import { Mysql_config, init_mysql_config, manager_info_table, manager_password_table } from '../config/mysql_config'

interface Manager {
  name: string,
  password: string,
  github: string
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
  addManager(manager: Manager): ManagerOperate {
    try {
      if (this.connection && this.curDb === this.db) {
        this.connection.query(`INSERT INTO ?? VALUES ( ?, ?, ?, ?);`, [this.tableName, null, manager.name, manager.password, manager.github], err => {
          if (err) throw err
          console.log(`${this.tableName} inserted, add ${manager.name} in manager table!`)
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
}

const root: Manager = {
  name: 'root',
  password: 'C4(i,&V%I-9YBvcm',
  github: 'https://github.com/result17'
}

const db = new ManagerOperate(init_mysql_config)
db.connect().useDB().dropTable('manager').createTable(manager_info_table).createTable(manager_password_table).end()

