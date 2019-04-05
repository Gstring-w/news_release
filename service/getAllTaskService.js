const connectionMysql = require("../dao/connectionMysql");

function getAllTaskService(req, arr) {
  const querySql = "select * from alltask where teacher_id=?";
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

module.exports = getAllTaskService;
