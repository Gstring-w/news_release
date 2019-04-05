const regiService = require("../service/regiService");

function loginWeb(req, res) {
  const { username, password } = req.query;
  const params = { username, password };

  regiService(params, res);
}

module.exports = loginWeb;
