const app = require("express")();
const express = require("express");
const path = require("path");
const multer = require("multer");
const upLoad = multer({ dest: "./file" });
const web = require("./web");
const bobyParser = require("body-parser");
app.use(express.static("public"));
//解决跨域
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.listen(3000, () => {
  console.log("服务启动 http://localhost");
});

// 根据登陆信息，返回选题老师，信息，论文等
app.get("/info", web.getInfoWeb); //params： ?userid=1111

//获得会话的历史纪录
app.get("/message", web.messageWb); // params： ?fromid=123&toid=123&page=1

//获得全部课题信息
app.get("/allTask", web.getAllTaskWeb); // params： ?teacher_id='1232'

// 文件上传
app.post("/upload", upLoad.single("file"), web.upLoadWeb);

//登陆
app.post("/login", bobyParser.json(), web.loginWeb); //params:{username,password}

//提交选题信息
app.get("/PostTask", web.postTaskWeb); //params:{ title:title,isTeacher:"false",selected_id:''}
