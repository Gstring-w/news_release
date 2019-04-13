const postArticelService = require("../service/postArticelService");

function postArticle(req, res) {
  const {
    newImge: image,
    newMark: tag,
    newPubDate: utime,
    newTitle: title,
    newurl: content
  } = req.body;
  params = [title, content, utime, tag, "root", image];
  console.log(params);
  postArticelService(params, res);
}

module.exports = postArticle;
