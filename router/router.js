var Book = require("./../models/Book.js");
var db = require("./../models/db.js");

exports.addbook = function(req,res,next){
    // res.render("addbook",{
        
    // })
    res.render("addbook");
}

exports.dobook = function(req,res,next){

    Book.create(req.query,function(err){
        if(err){
            res.send(err);
            return;
        }
        console.log("1");
        res.send("保存成功");
    })
}