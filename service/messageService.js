const connectionMysql = require("../dao/connectionMysql");

function messageService(app) {
  // app.header("Access-Control-Allow-Origin", "*");
  const io = require("socket.io")(app, {
    path: "/test",
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });
  io.on("connection", function(socket) {
    socket.on("message-client", function(data) {
      const { role, to, content } = data;
      const params = [role, to, content];
      console.log(data);
      insertMysql(params);
      io.emit("message", data);
    });
  });
  app.listen(12306);
}

function insertMysql(params) {
  let query = "INSERT INTO message (fromid,toid,content) values (?,?,?)";
  connectionMysql(query, params, (err, result) => {
    if (err) {
      console.log(`插入数据库 表${message}失败！`);
    }
  });
}
module.exports = messageService;
