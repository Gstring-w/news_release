const connectionMysql = require("../dao/connectionMysql");

function loginService(params, res) {
  const { username, password } = params;
  const arr = [username, password];
  const querySql = "SELECT * FROM `login_info` where username=? and password=?";

  connectionMysql(querySql, arr, (err, result) => {
    let data;
    if (result.length === 0) {
      data = {
        err: true
      };
    } else {
      data = {
        err: false,
        data: result
      };
    }

    if (err) {
      console.log(err);
    }

    console.log(data);
    res.send(data);
  });
}

module.exports = loginService;
