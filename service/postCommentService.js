const connectionMysql = require("../dao/connectionMysql");

function postCommentService(arr, req) {
  const querySql =
    "insert into comment (content,article_id,ownername,toname) values (?,?,?,?)";
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

module.exports = postCommentService;
