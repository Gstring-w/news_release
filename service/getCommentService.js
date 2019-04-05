const connectionMysql = require("../dao/connectionMysql");

function getCommentService(req, arr) {
  const querySql = "select * from comment where article=?";
  const arr = [arr];
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

module.exports = getCommentService;
