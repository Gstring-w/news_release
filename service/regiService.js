const connectionMysql = require("../dao/connectionMysql");
const hashNumber = require("../util/MathRadom");

function loginService(params, res) {
  const { username, passworld } = params;
  const userid = hashNumber();

  let arr = [username, passworld];
  let querySql = "SELECT * FROM `login_info` where username=? and password=?";
  let data;
  connectionMysql(querySql, arr, (err, result) => {
    console.log(result.length);

    if (result.length === 0) {
      querySql =
        "INSERT INTO `new_release`.`login_info` ( `userid`, `username`, `password`) VALUES (?, ?, ?)";
      arr = [userid, username, passworld];
      console.log(arr);
      connectionMysql(querySql, arr, (err, _result) => {
        if (err) {
          console.log(err);
        }
        data = { err: false };
      });
    } else {
      data = { err: true };
    }

    if (err) {
      console.log(err);
    }

    res.send(data);
  });
}

module.exports = loginService;
