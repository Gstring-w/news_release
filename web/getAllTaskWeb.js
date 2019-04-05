const getAllTaskService = require("../service/getAllTaskService");

function getAllTaskWeb(req, res) {
  const { teacher_id } = req.query;
  const arr = [teacher_id];
  getAllTaskService(res, arr);
}

module.exports = getAllTaskWeb;
