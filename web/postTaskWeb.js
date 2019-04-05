const postTaskService = require("../service/postTaskService");

function postTaskWeb(req, res) {
  const { title, isTeacher, selected_id } = req.query;
  const arr = [isTeacher, title, selected_id];
  postTaskService(arr, res);
}

module.exports = postTaskWeb;
