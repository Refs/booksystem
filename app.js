var express = require("express");
var ejs = require("ejs");
var router = require("./router/router.js");
//require的时候，js文件会自动执行一遍，有访问进来的时候，就会require一次，即打开数据库；
var db = require("./models/db.js");
var app = express();

app.set("view engine","ejs");

//图书列表
app.get("/",router.booklist);

//增加图书
app.get("/addbook",router.addbook);
app.get("/dobook",router.dobook);
app.get("/edit",router.doedit);


app.listen(3000)