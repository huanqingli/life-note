## fetch
发送HTTP请求，可代替AJAX。不支持IE。  
从 fetch()返回的 Promise 将不会拒绝HTTP错误状态，并且仅在网络故障时或任何阻止请求完成时，它才会拒绝。。  
默认情况下, fetch在服务端不会发送或接收任何 cookies。  
#### 基础
检查请求状态：`response.status`
请求成功（status值在200-299之间）：`response.ok`
body传递键值对：`'foo=bar&blah=1'`
#### 注意
跨域 POST 请求时:  
如果不是 application/x-www-form-urlencoded, multipart/form-data, ortext/plain 这三种形式的请求，会先发送一个 OPTION 请求确认服务器是否授权，得不到回应会终止该 POST 请求。  
It uses methods other than GET, HEAD or POST.  Also, if POST is used to send request data with a Content-Type other than application/x-www-form-urlencoded, multipart/form-data, ortext/plain, e.g. if the POST request sends an XML payload to the server using application/xmlor text/xml, then the request is preflighted.It sets custom headers in the request (e.g. the request uses a header such as X-PINGOTHER)  
#### 示例
```javascript
//简单GET请求
fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
  }).catch(function(e) {
    console.log("Oops, error");
  });
//**********************************************
//箭头函数
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))
//**********************************************
//简单POST请求
fetch('/users', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })//GET与HEAD请求不能有body
})
//**********************************************
// application/x-www-form-urlencoded 传递键值对时候，给body传递个字符串，用 ＝ 分隔健和值 如下
body: `username=${user.get('firstName')}&password=${user.get('email')}`
```
