// import * as mysql from 'mysql'
import { Mysql_config } from '../config/mysql_config'
import { DbConn } from './DbConn'

class DbOperate extends DbConn {
  protected curDb: string
  constructor(config: Mysql_config) {
    super(config)
  }
  connect(): DbOperate {
    super.connect()
    return this
  }
  dropDB(DbName: string = this.db): DbOperate {
    DbName = DbName ? DbName : this.db
    try {
      if (this.connection && this.curDb !== DbName) {
        this.connection.query(`DROP DATABASE ${DbName}`, err => {
          if (err) throw err
          console.log(`${DbName} database dropped.`)
        })
        if (this.db === DbName) {
          this.db = ''
        }
      } else {
        console.log(`Connection error or ${DbName} is using!`)
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  createDB(DbName: string = this.db): DbOperate {
    DbName = DbName ? DbName : this.db
    try {
      if (this.connection) {
        this.connection.query(`CREATE DATABASE ${DbName}`, err => {
          if (err) throw err
          console.log(`${DbName} database created`)
        })
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  useDB(DbName: string = this.db): DbOperate {
    DbName = DbName ? DbName : this.db
    try {
      if (this.connection) {
        this.connection.query(`USE ${DbName};`, err => {
          if (err) throw err
          console.log(`Database changed! Now is ${DbName}.`)
        })
      }
      this.curDb = DbName
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  createTable(command: string): DbOperate {
    try {
      if (this.connection && this.curDb) {
        this.connection.query(command, err => {
          if (err) throw err
          console.log('Table created!')
        })
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  showTables(): DbOperate {
    try {
      if (this.connection && this.curDb) {
        this.connection.query('SHOW TABLES;', (err, result) => {
          if (err) throw err
          console.log(result)
        })
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  dropTable(tableName: string): DbOperate {
    try {
      if (this.connection && this.curDb) {
        this.connection.query(`DROP TABLE ${tableName};`, err => {
          if (err) throw err
          console.log(`${tableName} dropped!`)
        })
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
}

// let d = new DbOperate(init_mysql_config)
// d.connect().useDB().dropDB('manager').createTable(manager_table).end()
// d.connect().useDB().showTables().dropTable('manager').createTable(manager_table).showTables().end()

// d.connect().useDB().createTable(manager_table).end()
// // d.connect().useDB().createTable(user_info_table).createTable(user_password_table).end()

export { DbOperate }
