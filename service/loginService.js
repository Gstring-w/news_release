const connectionMysql = require("../dao/connectionMysql");

function loginService(params, res) {
  const { username, password } = params;
  const arr = [username, password];
  const querySql = "SELECT * FROM `login_info` where username=? and password=?";

  connectionMysql(querySql, arr, (err, result) => {
    let data;
    data = {
      code: 200,
      data: result[0]
    };

    if (err) {
      console.log(err);
    }

    res.send(data);
  });
}

module.exports = loginService;
