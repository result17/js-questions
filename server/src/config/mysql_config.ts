
interface Mysql_config {
  host: string,
  user: string,
  password: string,
  port: number,
  charset: string,
  database: string,
  connectionLimit?: number,
}

const init_mysql_config: Mysql_config = {
  host: 'localhost',
  port: 7766,
  user: 'root',
  password: 'rU2$^o=Ej|4-W"<[',
  charset: 'utf8mb4',
  database: 'js_questions_Lib'
}

const user_info_table = `CREATE TABLE IF NOT EXISTS user_info(
                           id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                           username VARCHAR(50) NOT NULL,
                           email VARCHAR(255) NOT NULL
                        );`

const user_password_table = `CREATE TABLE IF NOT EXISTS user_password(
                               user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                               password VARCHAR(255) NOT NULL,
                               salt VARCHAR(255) NOT NULL
                            );`

const manager_info_table = `CREATE TABLE IF NOT EXISTS manager_info(
                              id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                              managername VARCHAR(50) NOT NULL,
                              type int NOT NULL,
                              github VARCHAR(255) NOT NULL,
                              create_at datetime NOT NULL DEFAULT NOW()
                           );`

const manager_mix_table = `CREATE TABLE IF NOT EXISTS manager_mix(
                             manager_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                             mix VARCHAR(255) NOT NULL,
                             salt VARCHAR(255) NOT NULL
                          );`

const questions_table = `CREATE TABLE IF NOT EXISTS questions(
                           id int NOT Null PRIMARY KEY AUTO_INCREMENT,
                           name VARCHAR(255) NOT NULL,
                           author VARCHAR(50) NOT NULL,
                           level VARCHAR(50) NOT NULL,
                           create_at datetime NOT NULL DEFAULT NOW(),
                           update_at datetime NOT NULL DEFAULT NOW(),
                           questions JSON NOT NULL,
                        )`           

export { Mysql_config, init_mysql_config, user_info_table, user_password_table, manager_info_table, manager_mix_table, questions_table }
