const getInfoDetailsService = require("../service/getInfoDetailsService");

function getInfoDetailsWeb(req, res) {
  const { id } = req.query;
  params = { id };
  getInfoDetailsService(params, res);
}

module.exports = getInfoDetailsWeb;
