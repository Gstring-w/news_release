const connectionMysql = require("../dao/connectionMysql");

function getInfoService(arr, req) {
  let querySql;
  const { tag } = arr;
  arr = [tag];
  if (tag === "all") {
    querySql = "select * from article";
    connectionMysql(querySql, [], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const data = {
          code: 200,
          data: result
        };
        req.send(data);
      }
    });
  } else {
    querySql = "select * from article where tag=?";
    connectionMysql(querySql, arr, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const data = {
          code: 200,
          data: result
        };
        req.send(data);
      }
    });
  }
}

module.exports = getInfoService;
