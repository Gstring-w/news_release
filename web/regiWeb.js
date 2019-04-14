const regiService = require("../service/regiService");

function loginWeb(req, res) {
  const { username, passworld } = req.query;
  console.log(req.query);
  const params = { username, passworld };

  regiService(params, res);
}

module.exports = loginWeb;
