## REST API
REST 是浏览器与服务器通信方式的一种设计风格。  
每一个URI代表一种资源。  
客户端通过四个HTTP动词，对服务器端资源进行操作(增删改查)。  
举例：
```javascript
GET     /zoos：                列出所有动物园
POST    /zoos：                新建一个动物园
GET     /zoos/ID：             获取某个指定动物园的信息
PUT     /zoos/ID：             更新某个指定动物园的信息（提供该动物园的全部信息）
DELETE  /zoos/ID：             删除某个动物园
GET     /zoos/ID/animals：     列出某个指定动物园的所有动物
DELETE  /zoos/ID/animals/ID：  删除某个指定动物园的指定动物
```
#### 基本约定
- url 代表资源，只可以是名词不能是动词，名次要用复数
- 附带合理的 HTTP 状态码 [参考](../../前端/HTTP/HTTP协议.md)
- 版本号放在HTTP头信息中(或者url) 示例:
```javascript
app.use((req, res, next) => {
  if (!req.get('Content-Type') || req.get('Content-Type').indexOf('version=1.0') === -1) {
    res.send('请在 Content-Type 中输入可用的API版本号')
  }
  res.set('Content-Type', 'application/json;version=1.0')
  next()
})
// 另一个
router.all('*', (req, res, next) => {
  if (
    req.get('Accept') &&
    req.get('Accept').indexOf('version=') !== -1 &&
    req.get('Accept').indexOf('version=1.0') === -1
  ) {
    res.json({ error: true, msg: '请在 Accept 中输入可用的API版本号' })
    return
  }
  res.set('Content-Type', 'application/json;version=1.0')
  next()
})
```
