### HTTP协议
1. HTTP本身就是一个协议，是从Web服务器传输超文本到本地浏览器的传送协议。
2. HTTP是一个基于请求/响应模式的、无状态的应用层协议。
HTTP协议永远都是客户端发起请求，服务器回送响应。
无状态是指协议对于事务处理没有记忆能力（为了保证服务器内存，提高Web服务器对并发访问的处理能力）。缺少状态意味着如果后续处理需要前面的信息，则它必须重传（这样可能导致每次连接传送的数据量增大）。
3. HTTP默认的端口号为80，HTTPS的端口号为443。
4. HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记。Accept 是接受返回数据的类型。
5. 完整请求过程：判断是否跳转，判断是否使用缓存，解析域名，建立 tcp 连接，客户机发送请求，服务机接受请求给予响应，客户机接受信息后断开连接。
6. HTTP 0.9和1.0使用非持续连接：限制每次TCP连接只处理一个请求，服务器处理完客户的请求，并收到客户的应答后，即断开连接（连接不可复用）。      
HTTP 1.1开始，一次 tcp 连接可以发送多次(但是是串行的) http 请求(提高了效率，tcp三次握手也挺费事的)。  
HTTP 2.0开始，一次 tcp 连接可以并行发送 http 请求，又一次提高了效率。  
chrome 同时可建立 6 个 TCP 连接。
7. 报文：启始行，首部，主体  
	- 请求报文启始行 = 方法 [空格] 请求URI [空格] 版本号 [回车换行] 如：  
POST http://192.168.2.217:8080/index.jsp   HTTP/1.1  
完整请求报文实例：  
GET /hello.htm HTTP/1.1  
Accept: */*  
Accept-Language: zh-cn  
Accept-Encoding: gzip, deflate  
If-Modified-Since: Wed, 17 Oct 2007 02:15:55 GMT  
If-None-Match: W/"158-1192587355000"  
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)  
Host: 192.168.2.162:8080  
Connection: Keep-Alive  

	- 响应报文启始行 = 版本号 [空格] 状态码 [空格] 原因 [回车换行] 如：
HTTP/1.0 200 OK  
完整的响应报文实例：  
HTTP/1.1 200 OK  
ETag: W/"158-1192590101000"  
Last-Modified: Wed, 17 Oct 2007 03:01:41 GMT  
Content-Type: text/html  
Content-Length: 158  
Date: Wed, 17 Oct 2007 03:01:59 GMT  
Server: Apache-Coyote/1.1  
8. 常见HTTP状态码：  
200，服务器已成功处理了请求并提供了请求的网页。  
201，新建或修改成功。  
202，请求已被接受，服务器未执行任何动作。  
204，服务器成功处理了请求，但没有返回任何内容。  
301，请求的网页已永久移动到新位置。当URLs发生变化时，使用301代码。搜索引擎索引中保存新的URL。  
302，请求的网页临时移动到新位置。搜索引擎索引中保存原来的URL。  
304，如果网页自请求者上次请求后没有更新，则用304代码告诉搜索引擎机器人，可节省带宽和开销。  
400，服务器不理解请求的语法。  
401，没权限。  
403，有权限，服务器拒绝请求。  
404，服务器找不到请求的网页。服务器上不存在的网页经常会返回此代码。  
406，没有用户请求的格式。  
410，请求的资源永久删除后，服务器返回此响应。  
500，服务器遇到错误，无法完成请求。  
503，服务器目前无法使用（由于超载或停机维护）。  
9. url格式：
protocol : // hostname[:port] / path / [;parameters][?query]#fragment
parameters（参数）  
这是用于指定特殊参数的可选项。  
query(查询)  
可选，用于给动态网页传递参数。  
fragment（信息片断）  
字符串，用于指定网络资源中的片断。  
10. 所谓跨域是浏览器自身的限制，请求会正常发送也会正常返回，只不过浏览器发现没有允许该域名的header，就会隐藏返回值并报错。
12. https 怎么保证安全的：加入 ssl 层,握手过程如下  
- client 发送: TLS版本号+所支持加密套件列表+希望使用的TLS选项
- Server 发送: 选择一个客户端的加密套件+自己的公钥+自己的证书+希望使用的TLS选项+（要求客户端证书）；
- Client 发送: (自己的证书)+使用服务器公钥和协商的加密套件加密一个对称秘钥（自己生成的一个随机值）；
- Server 发送: 使用私钥解密出对称秘钥（随机值）后，发送加密的Finish消息，表明完成握手

[参考](https://www.jianshu.com/p/992bad24412e)
#### 注意
跨域 POST 请求时(还有PUT，DELETE等非简单请求):  
如果不是 application/x-www-form-urlencoded, multipart/form-data, ortext/plain 这三种形式的请求，会先发送一个 OPTION 请求确认服务器是否授权，得不到回应会终止该 POST 请求。  
It uses methods other than GET, HEAD or POST.  Also, if POST is used to send request data with a Content-Type other than application/x-www-form-urlencoded, multipart/form-data, ortext/plain, e.g. if the POST request sends an XML payload to the server using application/xmlor text/xml, then the request is preflighted.It sets custom headers in the request (e.g. the request uses a header such as X-PINGOTHER)  
CSP 内容安全策略，为了安全性限制各种客户端请求，google － mdn csp 查看详情，有很多设置，还可以设置违规操作后 report 给服务器。
