const connections = require('../app/database')
class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = `insert into users (name, password) values (?, ?)`

    const result = connections.execute(statement, [name, password])
    return result;
    // 将user存储到数据库中
  }

  async getUserByName(name) {
    const statement = `select * from users where name = ?`
    const result = await connections.execute(statement, [name])
    return result[0];
  }
}

module.exports = new UserService();