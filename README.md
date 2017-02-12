# 图书管理系统

### v1.0 工作空间初始化

### v2.0 保存所有图书

* 链接数据库，并将返回数据库的数据库实例，暴露在外面

```js
    var mongoose = require("mongoose");
    var db = mongoose.connect("mongodb://127.0.0.1:27017/book");

    db.once('open', function (callback) {
    // yay!
    console.log("数据库连接成功！")
    });

    module.exports = db;

```

* 构建模具，并将做好的模具暴露在外面

```js
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

```
* 做好addbook的路由

```js
    //1.主路由
    app.get("/addbook",router.addbook);

    exports.addbook = function(req,res,next){
        res.render("addbook");
        //调试1 能否正确显示静态页面
    }

    //2.静态页面 addbook.ejs
    <h3>增加图书</h3>
    <form action="/dobook" method="get">
        <p>姓名： <input type="text" name="name"> </p>
        <p>作者： <input type="text" name="author"> </p>
        <p>价格： <input type="text" name="price"> </p>
        <p><input type="submit"></p>
    </form>
    //调试2 submit按钮能否正确发送请求；
```

```js
    //3.服务器响应并接受form表单的get请求
    app.get("/dobook",router.dobook);
    exports.dobook = function(req,res,next){
        console.log(req.query);
        //调试3 观察一下后台能否接收到前台的get请求；

        //4.require Book.js 引用Book 模具；并利用磨具创建一个实例；
        //不关心数据库，而只关心对象
        Book.create(req.query,function(err,result){
            if(err){
                res.send("失败");
                return;
            }
            res.send("保存成功");
        })
    }
```