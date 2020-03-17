import * as mysql from 'mysql'
import { Mysql_config } from '../config/mysql_config'

abstract class DbConn {
  public host: string
  public port: number
  public charset: string
  protected user: string
  protected password: string
  public db: string
  protected connection: mysql.Connection
  constructor(config: Mysql_config) {
    this.port = config.port
    this.charset = config.charset as string
    this.db = config.database as string
    [this.host ,this.user, this.password] = [config.host, config.user, config.password]
  }
  connect(): DbConn{
    try {
      this.connection = mysql.createConnection({
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
  end(): void {
    if (this.connection) {
      this.connection.end(err => {
        if (err) return console.log(`error: ${err.message}`)
        console.log('Close the database connection.')
      })
    }
  }
}

export { DbConn }