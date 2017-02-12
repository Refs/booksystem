//图书建模
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookSchema = new Schema({
  name:  String,
  price: Number,
  author: String,
  type: Array
  
});

var bookModel = mongoose.model("Book",bookSchema);

module.exports = bookModel;
