const connectionMysql = require("../dao/connectionMysql");

function deleteService(arr, req) {
  const querySql = "DELETE FROM article WHERE id=?";
  const { id } = arr;
  arr = [id];

  connectionMysql(querySql, arr, (err, result) => {
    if (err) {
      console.log(err);
    }
    req.send(result);
  });
}

module.exports = deleteService;
