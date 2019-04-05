const connectionMysql = require("../dao/connectionMysql");

function postTaskService(arr, req) {
  console.log(arr);
  const querySql =
    "insert into alltask (isTeacher,title,selected_id) values (?,?,?)";
  connectionMysql(querySql, arr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      req.send("添加成功");
    }
  });
}

module.exports = postTaskService;
