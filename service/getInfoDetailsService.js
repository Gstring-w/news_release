const connectionMysql = require("../dao/connectionMysql");

function getInfoDetailsService(arr, req) {
  const querySql = "select * from article where id=?";
  const { id } = arr;
  arr = [id];

  connectionMysql(querySql, arr, (err, result) => {
    if (err) {
      console.log(err);
    }
    req.send(result);
  });
}

module.exports = getInfoDetailsService;
