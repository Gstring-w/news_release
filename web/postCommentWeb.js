const postCommentService = require("../service/postCommentService");

function postCommentWeb(res, req) {
  const { article_id, content, ownername, toname = "" } = res.body;
  const arr = [content, article_id, ownername, toname];
  postCommentService(arr, req);
}

module.exports = postCommentWeb;
