### OAuth2
1. 权限认证中间件，看看有没有权限 cookie，没有就跳转到第三方授权服务器。
2. 用户在第三方授权后会跳转回制定路由，该路由不要认证权限，拿到 code 去三方服务器申请 token 并把 token 种下cookie。
3. 有了 token 可以向三方认证服务器请求用户信息等。
[参考](https://www.jianshu.com/p/0db71eb445c8)