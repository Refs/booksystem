//图书建模
var mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
var Schema = mongoose.Schema;
var bookSchema = new Schema({
  name:  String,
  price: Number,
  author: String,
  type: Array
  
});
bookSchema.statics.zhaoshu = function(_id,callback){
    this.model("Book").find({"_id":ObjectId(_id)},callback);
}
bookSchema.statics.booklist = function(callback){
    this.model("Book").find({},callback);
}

var bookModel = mongoose.model("Book",bookSchema);

module.exports = bookModel;
