## express
#### 入口文件要做的事(注意顺序)
1. 引入所需模块。
2. 建立 express 应用。
3. 配置 express 应用(静态文件目录等)。
4. 连接数据库。
5. 定义中间件(body-parser 等)。
6. 定义路由。
7. 启动应用。

#### APP 的属性与方法
- app.locals:  
应用生命周期内的全局变量
```javascript
app.locals.title = 'My App';
// 在路由中使用 req.app.locals.title 调用
// req.app 获取当前 app 实例
// 单个请求生命周期内的变量使用  res.locals
```
- app.all(path, callback [, callback ...]):  
还有 get post put delete 方法， all 响应全部请求
```javascript
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
});
// 对授权等操作很有用
app.all('*', requireAuthentication, loadUser);
app.all('/api/*', requireAuthentication);
```
- app.get(name):  
返回 app 实例上 name 的值  
注意，和响应 get 请求的方法完全不同哦  
```javascript
// 可以在 app 实例上添加自定义值
app.get('title');
// => undefined
app.set('title', 'My Site');
app.get('title');
// => "My Site"
```
- app.set(name, value):  
设置 app 实例上的值，用法看上面，[看看有啥可设置的](http://expressjs.com/zh-cn/4x/api.html#app.settings.table)
- app.param([name], callback):  
常用作验证参数等  
```javascript
app.param('id', function (req, res, next, id) {
  console.log('ID is OK, you can go next');
  // 通常在这验证参数或执行其他操作，再决定是否下放给路由或是返回错误。
  next();
});  
app.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});
app.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
```
- app.use([path,] callback [, callback...]):  
挂载中间件  path 默认是 /  
会对所有以路由以 path 开头的请求应用 callback  
all get 等也可以挂载中间件，只是严格匹配路由  
别忘了 next()  

#### request 的属性与方法
- req.app:  
获取 app 实例  
可以通过 app.get(name),app.locals.name 获取挂载在 app 实例上的值  
- req.body:
获取请求通过 body 传递的参数，需要预先经过 body-parser  
- req.params:  
获取路由中传递的参数  
例如 req.params.name 获取 /user/:name 中 name 的值
- req.query:  
获取 url 中传递的参数:  
```javascript
// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"
req.query.shoe.color
// => "blue"
req.query.shoe.type
// => "converse"
```
- req.cookies:  
获取请求发过来的 cookie，需要预先经过 cookie-parser  
- req.baseUrl:  
获取根路由    
```javascript
var greet = express.Router();
//
greet.get('/jp', function (req, res) {
  console.log(req.baseUrl); // /greet
  res.send('Konichiwa!');
});
//
app.use('/greet', greet); // load the router on '/greet'
```
- req.originalUrl:  
获取完整的路由  
- req.path:  
获取完整路由的 path 部分  
- req.route:  
返回当前路由的详细信息  
- req.hostname: 获取发起请求的主机
- req.subdomains: 获取请求的子域
- req.ip: 获取发起请求的ip
- req.method: 获取发起请求的方式  
- req.protocol: 获取发起请求的协议  
- req.accepts(types):
是否接受某种格式数据的返回，请求头的 Accept 中设置
- req.get(field):  
获取请求头中的指定信息  
```javascript
req.get('Content-Type');
// => "text/plain"
```

#### response 的属性和方法
- res.app: 与 req.app 相同
- res.headersSent: 是否已经返回响应头
- res.append(field [, value]): 为返回响应头是，可以通过这句设置响应头
- res.locals: 该请求生命周期中的变量  
- res.cookie(name, value [, options]): 设置 cookie
- res.clearCookie: 清空 cookie
- res.set(field [, value]): 设置响应头
- res.get(field):  
获取响应头中的指定信息
```javascript
res.get('Content-Type');
// => "text/plain"
```
- res.status(code): 设置状态码
- res.end(): 结束响应
```javascript
res.end();
res.status(404).end();
```
- res.sendStatus(statusCode): 返回状态码   
```javascript
res.sendStatus(200); // equivalent to res.status(200).send('OK')
res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
```
- res.send([body]): 返回各类数据
```javascript
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });
```
- res.download(path [, filename] [, fn]): 设置下载文件
- res.sendFile(path [, options] [, fn]): 返回一个文件
- res.json([body]): 返回一个 json 数据
- res.format(object):  
根据请求头里 Accept 的格式做出不同响应
```javascript
res.format({
  'text/plain': function(){
    res.send('hey');
  },
  'text/html': function(){
    res.send('<p>hey</p>');
  },
  'application/json': function(){
    res.send({ message: 'hey' });
  },
  'default': function() {
    // log the request and respond with 406
    res.status(406).send('Not Acceptable');
  }
});
// 或
res.format({
  text: function(){
    res.send('hey');
  },
  html: function(){
    res.send('<p>hey</p>');
  },
  json: function(){
    res.send({ message: 'hey' });
  }
});
```
- res.redirect([status,] path): 重定向
```javascript
res.redirect('/foo/bar');
res.redirect('http://example.com');
res.redirect(301, 'http://example.com');
res.redirect('../login');
```
#### Router
router 在处理请求时如同 app  
拥有和 app 相同的 use all get post 等方法

#### 最佳实践
[参考](https://github.com/goldbergyoni/nodebestpractices/blob/master/README.chinese.md)
##### 项目结构
1. 单独模块，比如 product，不要分model，controller，test等，都放在一个文件里，按功能设计文件结构。
2. 保持express在特定区域，即保持express在路由里，不要把express的内容渗入到数据模块等。
3. 公共模块封装包。
4. API与网络配置分离，网络相关放在./bin/www
5. 分层配置
##### 错误处理
1. 使用Promise
2. 使用内建错误类型(throw new Error('bulabula'))
3. 区分操作形错误(例如网络连接失败)与程序错误(bug)
4. 集中处理错误但不是在中间件
5. API调用可能产生的错误Swagger文档化
6. 出现未知错误让应用崩溃
7. 使用成熟的日志工具
8. 单元测试
9. 使用APM产品发现错误[例如](https://uptimerobot.com/)
10. 捕获Promise里的错误
11. 专门的库验证API传参[joi](https://github.com/hapijs/joi#readme)
[参考](https://cnodejs.org/topic/55714dfac4e7fbea6e9a2e5d)

