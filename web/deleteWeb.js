const deleteService = require("../service/deleteService");

function deleteWb(req, res) {
  const { id } = req.query;
  params = { id };
  deleteService(params, res);
}

module.exports = deleteWb;
