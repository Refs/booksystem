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

### 列出所有的图书

```js
    //1.静态页面index.ejs
    <h3>图书列表</h3>
    <table>
       <tr><td>图书名</td><td> 作者</td><td>价格</td></tr>
       <%for(var i=0;i<book.length;i++){%>
            <tr><td><%=book[i].name%></td><td><%=book[i].author%></td><td><%=book[i].price%></td></tr>
       <%}%>
    </table>
```
```js
    //2.主路由
    app.get("/",router.showIndex);

    exports.showIndex = function(req,res,next){
        Book.userlist(function(err,result)){
             res.render("index"{
                //测试用的假数据
                //"book":[{"name":"hhh","author":"23","price":"1"},{"name":"小兰","author":"23","price":"1"}]
                book: result; //搜索数据库返回的就是一个数组；
            })
        }
    }
```

```js
    //Book.js中增加bookSchema的静态方法
    var bookSchema = new Schema({
        name:  String,
        price: Number,
        author: String,
        type: Array
    });
    bookSchema.static.userlist = function(callback){
        this.model("Book").find({},callback);
    }

```

### 修改图书条目(重点在于修改与删除的链接是如何发出去的)

```js
    //1.静态页面index.ejs
    <h3>图书列表</h3>
    <table>
       <tr><td>图书名</td><td> 作者</td><td>价格</td><td>操作</td></tr>
       <%for(var i=0;i<book.length;i++){%>
            <tr><td><%=book[i].name%></td><td><%=book[i].author%></td><td><%=book[i].price%></td>
            <!--点击修改链接，就会请求至127.0.0.1:3000/edit?id=324124215245链接,学习这种链接的设计-->
            <td><a href="/edit?id=<%=book[i]._id%>">修改</a></td>
            </tr>
       <%}%>
    </table>
    <!--点击增加图书链接，就会请求至127.0.0.1:3000/addbook-->
    <p><a href="/addbook">【增加图书】</a></p>

    //点击调试，看两个链接是否都能发送出去；
```

```js
    //2. 修改页面 edit.ejs  打开页面之后，表单控件之内已经默认填好的一些文字，修改就是在这个基础上去修改，这一点用户体验上很好；
    <h3>修改</h3>
    <form action="" method="get">
        <p>书名： <input type="text" name="name" value="<%=name%>"></p>
        <p>作者： <input type="text" name="author" value="<%=author%>"></p>
        <p>书名： <input type="text" name="price" value="<%=price%>"></p>
        <p><input type="submit" ></p>
    </form>
    
```


```js
    //封装依靠_id寻找document的函数r
    var var ObjectId  = require('mongodb').ObjectID;
    bookSchema.statics.zhaoshu = function(_id,callback){
        this.model("Book").find({"_id":ObjectId(_id)},callback);
        //之所以要用ObjectId括起来，是因为在数据库中_id是一个Object对象，而不是一个string字符串，普通场景需要引包，即var ObjectId  = require('mongodb').ObjectID,
    }
```

```js
    //后台主路由
    app.get("/edit",router.doEdit);

    exports.doEdit = function(req,res,next){
        var _id = req.query.id;
        Book.zhaoshu(_id,function(err,result){
            res.render("edit",result[0])
        })
    }
```

> 修道 1.是要去修静，修无，“夫物芸芸，各归其根，归根曰静，静曰复命”，归静与无乃是平息业火的关键，也是最基本的导引之法，没有筋脉、没有气（感受到的气都是幻觉）、没有精、没有血（能感受到这些都是业力使然，故意用此遮蔽自身智慧），有的只有归静之法，归无之法； 2.断念，自己干活官别人闲着，自己就会生不平之念；自己平庸er 管别人才华横溢就会生嫉妒之念；别人狠使自己，处处刁难自己，自身就会生怨恨之念；看到美丽、美好事物自己就会生贪有之念，断掉这些念头，断掉这些‘贪嗔痴’既是断念；3.修业，禁欲10一周以上（随着自己年龄越长，这个周期会越来越长，所以说修行要趁早，晚了自身就枯竭了），就会感觉在自己肚脐以上肝部一下的区域一团火热，这可以看作是业火，也可以看做的欲火，这团火是生命之火，人之所以生而延续都是因为这股能量在作用；这股火热是一股能量，守住这团火，用入静之法（不存在导引之法，只存在入静归无之法，这是一个血的教训），让其归于无，就可以改变自身体质，开启自身智慧，就为修业；反之，自己若守不住这团火，这团火的能量，就会转化业力，这股业力会然自身产有各种的欲念，或潜意识，会不停的暗示你，不停的诱使你去放纵，直到你朦朦胧胧，不能自己，心不被自己支配的情况下放纵，放纵后将这股能量耗尽； 