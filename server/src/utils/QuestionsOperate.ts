import * as moment from 'moment'
import { DbOperate } from './DbOperate'
import { Mysql_config, init_mysql_config } from '../config/mysql_config'

interface Option {
  text: string,
  correct: boolean,
  __typename: 'Option',
}

interface Question {
  id: number,
  title: string,
  code?: string,
  options: Option[],
  explanation: string,
  __typename: 'Question',
}

interface QuestionsContext {
  level: 'easy' | 'medium' | 'diffcult',
  name: string,
  author: string,
  questions: Question[],
}

moment.locale('zh-cn')

class QuestionsOperate extends DbOperate {
  public readonly tableName: string = 'questions'
  constructor(config: Mysql_config = init_mysql_config) {
    super(config)
  }
  async connect(): Promise<QuestionsOperate> {
    await super.connect()
    return this
  }
  async useDB(DbName: string = this.db): Promise<QuestionsOperate> {
    await super.useDB()
    return this
  }
  async addQuestions(context: QuestionsContext): Promise<QuestionsOperate> {
    if (this.connection && this.curDb === this.db) {
      const now = moment().format('YYYY-MM-DD HH:mm:ss')
      await this.connection.promise().query(`INSERT INTO ?? VALUES (?, ?, ?, ?, ?, ?, ?);`, [this.tableName, null, context.name, context.author, context.level, now, now, JSON.stringify(context.questions)]).then(() => {
        console.log(`Add ${context.name} in questions!`)
      }).catch(err => {
      // todo
        throw err
      }) 
    }
    return this
  }
  async getQuestionInfoList<T>(): Promise<T[]> {
    if (this.connection && this.curDb === this.db) {
      let list: T[] = []
      await this.connection.promise().query(`SELECT id, name, level, author, create_at, update_at FROM ${this.tableName};`).then(([rows, fields]) => {
        list = rows
      }).catch(err => {
        console.error(err.message)
      })
      return list
    }
  }
  async getQuestionDataByid<T>(id: number): Promise<T[]> {
    if (this.connection && this.curDb === this.db) {
      let list: T[] = []
      await this.connection.promise().query(`SELECT questions FROM ?? WHERE id = ?;`, [this.tableName, id]).then(([rows, field]) => {
        list = rows
      }).catch(err => {
        console.error(err.message)
      })
      return list
    }
  }
}

export { Option, Question, QuestionsContext, QuestionsOperate }