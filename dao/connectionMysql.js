const mysql = require("mysql");
const mysqlConfig = require("./mysqlConfig");

var pool = mysql.createPool(mysqlConfig);

function connectionMysql(str, params, cb) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("连接数据库出错" + err);
    }

    connection.query(str, params, cb);
    connection.release();
  });
}

module.exports = connectionMysql;
