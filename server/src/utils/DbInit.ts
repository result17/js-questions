import * as mysql from 'mysql2'
import { Mysql_config, init_mysql_config} from '../config/mysql_config'

class DbInit {
  public host: string
  public port: number
  public charset: string
  private user: string
  private password: string
  public db: string
  public connection: mysql.Connection
  constructor(config: Mysql_config) {
    this.port = config.port
    this.charset = config.charset as string
    this.db = config.database as string
    [this.host ,this.user, this.password] = [config.host, config.user, config.password]
  }
  async connect() {
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
      console.error(`connect failed: ${e.stack}`)
    }
    return this
  }
  async end() {
    if (this.connection) {
      await this.connection.end(err => {
        if (err) return console.log(`error: ${err.message}`)
        console.log('Close the database connection')
      })
    }
  }
  async createDB() {
    try {
      if (this.connection) {
        await this.connection.query(`CREATE DATABASE ${this.db}`, err => {
          if (err) throw err
          console.log(`${this.db} database created`)
        })
      }
    } catch(e) {
      console.error(e.message)
    }
  }
}

let db = new DbInit(init_mysql_config)
db.connect().then(it => it.end())
