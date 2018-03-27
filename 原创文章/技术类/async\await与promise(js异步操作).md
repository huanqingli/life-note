## async/await与promise(js异步操作)
此文只是粗略介绍使用方法，欲了解核心概念请参考官方文档或其他资料。
举例写文章详情页面的时候的一个场景：首先更改文章详情中的 PV，然后读取文章详情，然后根据文章详情中文章 Id 查阅该文章评论和该文章作者信息。获取全部数据之后渲染文章详情页。数据库操作都是异步的，最直接想到的办法就是一层一层的回调函数，问题出来了：十分不雅观，要是层再多一点还会有更多麻烦。怎么解决？业内为了处理异步操作问题也是拼了，什么async，q，bluebird，co，处理方式不同，各有千秋，感兴趣可以了解一下，但是惊喜的发现nodejs 7.6已经默认支持ES7中的 async/await 了，结合ES6中的 promise对象，用起来不亦乐乎的。
Async/await的主要益处是可以避免回调地狱（callback hell）问题。

#### 基本概念：
- async 表示这是一个async函数，await只能用在这个函数里面。async 对象也是一个 promise 对象。
- await 表示在这里等待 promise 返回结果了，再继续执行。
- await 后面跟着的应该是一个 promise 对象（当然，其他返回值也没关系，不过那样就没有意义了…）
- 很多库的接口返回 promise 对象，await 后赋值给一个变量后使用其 resolve 的值。[例如](http://mongoosejs.com/docs/api.html#query_Query-exec)
- 注意三点，promise 对象的状态，promise 对象上的方法(then,catch),promise 对象返回的值。

#### 举例：
- 获取返回值
``` javascript
var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 返回 ‘ok’
            resolve('ok');
        }, time);
    }) // 返回一个 promise 对象
};
var start = async function () {
    let result = await sleep(3000); // 使用该对象
    console.log(result); // 收到 ‘ok’
};
```
- 捕捉错误
```javascript
var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 模拟出错了，返回 ‘error’
            reject('error');
        }, time);
    })
};
var start = async function () {
    try {
        console.log('start');
        await sleep(3000); // 这里得到了一个返回错误

        // 所以以下代码不会被执行了
        console.log('end');
    } catch (err) {
        console.log(err); // 这里捕捉到错误 `error`
    }
};
const search = async () => {
    const project = await Project.findById(id)
    Project.belongsToMany(User, { through: 'UserProject' })
    const users = await project.getUsers()
    Project.hasMany(Task)
    const task = await project.getTasks()
    return { project, users, task }
  }
  search().then(data => res.json(data)).catch((err) => {
    console.log(err)
    res.send({ name: err.name, msg: err.message })
  })
```
- 在循环中
```javascript
var start = async function () {
    for (var i = 1; i <= 10; i++) {
        console.log(`当前是第${i}次等待..`);
        await sleep(1000);
    }
}; // 再循环中使用不需要闭包，每次循环会被阻塞。
```
- 遇到可同时执行的异步操作
```javascript
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
Promise.all()         // 全部完成时返回
Promise.race()        // 任意一个完成时返回
// 比下面按顺序执行会节省一些时间
let foo = await getFoo();
let bar = await getBar();
```
#### 最前面提到的场景：
```javascript
var showArticle = async function () {
        await new Promise(function (resolve, reject) {
            PostModel.incPv(postId, function (result) {
                resolve(result);
            });
        });// pv 加 1
        var post = await new Promise(function (resolve, reject) {
            PostModel.getPostById(postId, function (article) {
                resolve(article);
            });
        });// 获取文章信息
        await new Promise(function (resolve, reject) {
            userModel.getUserById(post.author,function (author) {
                post.author=author;
                resolve();
            })
        });//获取文章作者
        var comments = await new Promise(function (resolve, reject) {
            CommentModel.getComments(post._id, function (comment) {
                resolve(comment);
            });
        });// 获取该文章所有留言
        for(var i=0;i<comments.length;i++){
            await new Promise(function (resolve, reject) {
                userModel.getUserById(comments[i].author,function (author) {
                    comments[i].author=author;
                    resolve();
                })
            });//获取文章留言作者
        }
        if (!post) {
            req.session.error = '该文章不存在';
            return res.redirect('/post');
        }
        res.render('post',{post: post, comments: comments});
    };

    showArticle();
```
[参考](http://es6.ruanyifeng.com/#docs/async)
[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[参考](http://liubin.org/promises-book/#introduction)