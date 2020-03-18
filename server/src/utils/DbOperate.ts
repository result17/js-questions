// import * as mysql from 'mysql'
import { Mysql_config } from '../config/mysql_config'
import { DbConn } from './DbConn'

class DbOperate extends DbConn {
  protected curDb: string
  constructor(config: Mysql_config) {
    super(config)
  }
  async connect(): Promise<DbOperate> {
    await super.connect()
    return this
  }
  async dropDB(DbName: string = this.db): Promise<DbOperate> {
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
  async createDB(DbName: string = this.db): Promise<DbOperate> {
    DbName = DbName ? DbName : this.db
    try {
      if (this.connection) {
        await this.connection.query(`CREATE DATABASE ${DbName}`, err => {
          if (err) throw err
          console.log(`${DbName} database created`)
        })
      }
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  async useDB(DbName: string = this.db): Promise<DbOperate> {
    DbName = DbName ? DbName : this.db
    try {
      if (this.connection) {
        await this.connection.promise().query(`USE ${DbName};`).then(() => {
          console.log(`Database changed! Now is ${DbName}.`)
        }).catch(err => {
          throw err
        })
      }
      this.curDb = DbName
    } catch(e) {
      console.error(e.message)
    }
    return this
  }
  async createTable(command: string): Promise<DbOperate> {
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
  async showTables(): Promise<DbOperate> {
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
  async dropTable(tableName: string): Promise<DbOperate> {
    try {
      if (this.connection && this.curDb) {
        await this.connection.query(`DROP TABLE ${tableName};`, err => {
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

export { DbOperate }
