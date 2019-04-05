const getInfoService = require("../service/getInfoService");

function getInfoWeb(res, req) {
  const { userid } = res.query;
  getInfoService(userid, req);
}

module.exports = getInfoWeb;
