const getInfoService = require("../service/getInfoService");

function getInfoWeb(req, res) {
  const { tag = "all" } = req.query;
  params = { tag };
  getInfoService(params, res);
}

module.exports = getInfoWeb;
