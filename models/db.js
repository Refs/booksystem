
//数据库的链接
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/book");

var db = mongoose.Connection;

module.exports = db;