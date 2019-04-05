const connectionMysql = require("../dao/connectionMysql");

function messageAllService(params, req) {
  const querySql = "select * from message where fromid=? and toid=?";
  const arr = [params["fromid"], params["toid"]];
  connectionMysql(querySql, arr, (err, result) => {
    if (err) {
      console.log("查询message失败" + err);
    }

    let data = {
      code: 200,
      data: result
    };
    console.log(result);
    req.send(data);
  });
}

module.exports = messageAllService;
