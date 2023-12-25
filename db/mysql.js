const mysql = require('mysql')
const { MYSQL_CONF } = require('./dbConfig')

// 创建连接
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 执行sql
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape
}