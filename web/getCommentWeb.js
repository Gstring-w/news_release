const getCommentService = require("../service/getCommentService");

function getCommentWeb(res, req) {
  const { articleId } = res.query;

  getCommentService(articleId, req);
}

module.exports = getCommentWeb;
