const connectionMysql = require("../dao/connectionMysql");
const hashNumber = require("../util/MathRadom");

function loginService(params, res) {
  const { username, password } = params;
  const userid = hashNumber();

  const arr = [userid, username, password];
  const querySql =
    "INSERT INTO `new_release`.`login_info` ( `userid`, `username`, `password`) VALUES (?, ?, ?)";

  connectionMysql(querySql, arr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
    }
    res.send(result);
  });
}

module.exports = loginService;
