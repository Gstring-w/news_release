const loginService = require("../service/loginService");

function loginWeb(req, res) {
  const { username, password } = req.body;
  const params = { username, password };

  loginService(params, res);
}

module.exports = loginWeb;
