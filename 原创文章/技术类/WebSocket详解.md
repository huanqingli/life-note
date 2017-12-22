## WebSocket详解
因为 http 协议是单向的，之前如果服务器端有连续的变化需要通知客户端，只能通过客户端进行轮询（或者 long poll），但是轮询非常浪费资源，工程师们就发明了WebSocket。2011年成为国际标准，目前所有浏览器都已经支持了。  
WebSocket 协议是基于TCP的一种新的网络协议。它实现了浏览器与服务器全双工(full-duplex)通信——**允许服务器主动发送信息给客户端**。这是百度百科的定义，非常容易理解。服务端主动推送消息到客户端解决了一大痛点，也是使用WebSocket的最大原因。  
在 WebSocket API，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。
#### 特点
1. 建立在TCP协议之上，服务器端容易实现。
2. 与 HTTP 兼容良好，握手阶段采用 HTTP 协议。
3. 性能开销小，通信高效。
4. 可发送文本或二进制数据。
5. 没有同源限制。
#### 优势
一句话就是：持久化链接  
相比于轮询和 long poll，WebSocket 带来的性能开销优势就是因为持久化链接。  
简单说下轮询和 long poll，轮询就是每隔一段时间就请求，每次请求无论数据是否更新都要占据后台服务的资源，非常浪费，需要后台服务有很快的处理速度，long poll 就是发送请求后，直到服务器更新了才返回更新的信息，也很浪费，需要后台服务很好的处理高并发的能力。  
对比一下，每条 http 请求需要经过 Nginx 转发到特定的后台服务，后台服务处理请求，而且因为是无状态的，每次都要解析头信息，搞的后台服务也很烦。而 WebSocket 与 Nginx 建立持久化链接后，后台服务与客户端通信变得非常高效。Nginx 能力很强，保持这种持久化链接小菜一碟。
#### 使用
示例：
```js
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server', event.data);
});
```
详细 API 见 [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
详细使用见 [地址](http://www.ruanyifeng.com/blog/2017/05/websocket.html)
#### Socket.IO
了解 WebSocket 的时候很容易接触到 Socket.IO，两者关系：Socket.IO 是 WebSocket 在 node.js 和客户端的一种实现，这么说也不准确，因为他会在无法使用 Websocket 的时候采用其他代替方案实现类似持久链接。  
这样描述应该跟准确：Socket.IO 是建立 node.js服务端与客户端之间持久链接的一个框架，会优先采用 WebSocket 协议。  
其接口简单容易理解，参考[官方文档](https://socket.io/docs/)