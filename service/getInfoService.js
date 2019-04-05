const connectionMysql = require("../dao/connectionMysql");

function getInfoService(params, req) {
  connectionMysql();
}
