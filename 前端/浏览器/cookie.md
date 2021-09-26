## cookie

1. domain 不同是不会发送 cookie 的，举例：  
   浏览页面 a.shopee.io , 查看有两个 cookie：  
   x = 1 种在 a.shopee.io domain 下
   y = 2 种在 .shopee.io domain 下
   页面发送请求到 b.shopee.io, y=2 会被带上，但 x=1 不会！
   如果发现 x=1 也被带上了，浏览器访问下 b.shopee.io 地址，查看该地址 cookie，
   一定会有 x = 1 种在 b.shopee.io domain 下。 破案

2. SameSite 防止 CSRF 攻击，  
   [参考](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
