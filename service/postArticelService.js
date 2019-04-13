const connectionMysql = require("../dao/connectionMysql");

function postAritcleService(arr, req) {
  const querySql =
    "insert into article (title,content,utime,tag,author,img) values (?,?,?,?,?,?)";

  connectionMysql(querySql, arr, (err, result) => {
    if (err) {
      console.log(err);
    }
    req.send(result);
  });
}

module.exports = postAritcleService;
