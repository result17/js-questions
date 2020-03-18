import * as mysql from 'mysql2'
import { Mysql_config } from '../config/mysql_config'

abstract class DbConn {
  public host: string
  public port: number
  public charset: string
  protected user: string
  protected password: string
  public db: string
  // mysql2没有typescript支持
  protected connection: any
  constructor(config: Mysql_config) {
    this.port = config.port
    this.charset = config.charset as string
    this.db = config.database as string
    [this.host ,this.user, this.password] = [config.host, config.user, config.password]
  }
  async connect(): Promise<DbConn>{
    try {
      this.connection = await mysql.createConnection({
        host: this.host,
        port: this.port,
        user: this.user,
        password: this.password,
        charset: this.charset
      })
      console.log('Connected to the MySQL server.')
    } catch(e) {
      console.error(`connect failed: ${e.stack}.`)
      return
    }
    this.password = ''
    return this
  }
  async end(): Promise<void> {
    if (this.connection) {
      await this.connection.end(err => {
        if (err) return console.log(`error: ${err.message}`)
        console.log('Close the database connection.')
      })
    }
  }
}

export { DbConn }