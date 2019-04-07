const connectionMysql = require("../dao/connectionMysql");

function getCommentService(articleId, req) {
  const querySql = "select * from comment where article_id=?";
  let arr = [articleId];
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
