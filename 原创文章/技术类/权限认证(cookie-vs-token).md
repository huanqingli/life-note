## 权限认证 cookie VS token
我前公司的应用都是 token 授权的，现公司都是维护一个 session 确认登录状态的。那么我在这掰扯掰扯这两种权限认证的方方面面。
### 工作流程
#### 先说 cookie
cookie 登录是有状态的，服务端维护一个 session 客户端维护一个 cookie，cookie 只保留 sessionID 服务端要保存并跟踪所有活动的 session 如下：
1. 输入用户名密码登陆。
2. 服务器拿到身份并验证后生成一个 session 存到数据库。
3. 把 sessionID 返回给客户端存成一个 cookie 保存 sessionID。
4. 随后的请求会携带这个包含 sessionID 的 cookie。
5. 服务器拿着 sessionID 找到对应的 session 认证用户是否有对应权限啊。
6. 登出后，服务端销毁 session 客户端销毁 cookie。
#### token
token 的认证方式是无状态的，服务端不保存登陆状态，也不关心哪些客户端签发了 token ，每个请求都会携带 token 通常在 header 中，也可以出现在 body 和 query 如下：
1. 输入用户名密码登陆。
2. 服务器拿到身份并验证后签发一个 token。
3. 客户端拿到 token 并存起来，好多地方都可以存。
4. 客户端发送的每一个请求都要携带 token，好多方式可以携带。
5. 服务器接收请求后拿到 token 并解析，拿解析的结果进行权限认证(token中可能已经携带权限信息,能被正常解析的 token 被认为是合法机构签发的)。
6. 登出后，在客户端销毁 token 即可。
无图无真相，两种方式对比  
![链接](https://cdn.auth0.com/blog/cookies-vs-tokens/cookie-token-auth.png)
### token 的优势
新的东西如果没有原来的好用是不会有人用的。那 token 哪里好呢。
- 无状态，token 是无状态的，服务器端不需要保留任何信息，每个 token 都会包含所有需要的用户信息。服务器端可以只负责签发和解析 token 解放了部分服务器资源，让服务器更单纯的提供接口。
- 跨服务器，无状态优势在此。服务器如果做了负载均衡之类的，你两条请求不一定去同一个服务器，着如果用服务器维护一个 session 的话就显得有些棘手了，一个服务器和一个客户端对应，另一个服务器不一定认得你啊，不对是一定不认得你啊，当然这个问题也不难解决。
- 可以携带其他信息,比如携带具体权限信息之类的，省的还要去查库。
- 性能，解 token 可比查库要省事儿的多。
- 跨域，请求需要跨域的接口的时候 cookie 就力不从心了，不同域就不会携带 cookie ，不携带 cookie 服务器也不知道是哪个 session 啊，token 在此优势明显。
- 配合移动端，cookie 是浏览器端的玩意儿，移动端应用想使用 cookie 还得折腾一下，token 就方便得多。token 让服务器端单纯提供 API 服务，适用性更广。
- CSRF，如果 token 不存放在 cookie 中，防止了跨站请求伪造带来的安全性风险。
参考：[地址](https://auth0.com/blog/cookies-vs-tokens-definitive-guide/)

