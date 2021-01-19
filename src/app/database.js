const mysql = require('mysql2');
const config = require('./config');

const connections = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: '12345678'
})

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if(err) {
      console.log('连接失败');
    }else {
      console.log('连接成功~');
    }
  })
})

module.exports = connections.promise();