class UserService {
  async create(user) {
    console.log("用户数据保存到数据库中",user)
    return "创建用户成功~"
    // 将user存储到数据库中
  }
}

module.exports = new UserService();