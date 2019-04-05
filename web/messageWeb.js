const messageAllService = require("../service/messageAllService");

function messageWeb(res, req) {
  const { fromid, toid } = res.query;
  const params = {
    fromid,
    toid
  };
  messageAllService(params, req);
}

module.exports = messageWeb;
