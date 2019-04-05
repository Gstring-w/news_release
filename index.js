const app = require("express")();
const express = require("express");
const path = require("path");
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
  console.log("服务启动 浏览器访问：http://localhost:3000");
});
// 更具新闻类型，返回数据
app.get("/info", web.getInfoWeb); //params： ?tag=""

// //登陆
app.post("/login", bobyParser.json(), web.loginWeb); //params:{username,password}
// //注册

app.get("/regier", bobyParser.json(), web.regiWeb); // params:{username,password}

// // 获取评论信息
app.get("/comment", web.getCommentWeb); //?article=111
app.post("/comment_post", bobyParser.json(), web.postCommentWeb); // params {article_id,content,ownername,toname?}
