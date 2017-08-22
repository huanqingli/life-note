## NGINX
### 命令
- 不中断服务的重启(可用作重载配置): `kill -HUP <pid>` 或 `sudo nginx -s reload`
-
### 配置
user root;
给 nginx 所有权限，默认 user nginx。  
默认配置文件位于 /etc/nginx 主配置文件 nginx.conf  
写配置千万别忘结尾了 ; 这个符号  
- 重定向:
```javascript
// 把 dabao.love 重定向到 www.dabao.love
server {
    listen       80;
    server_name  dabao.love;
    return       301 http://www.dabao.love$request_uri;
}
```
– 路径匹配:
```js
location  = / {
  # 只匹配"/".
  [ configuration A ]
}
location  / {
  # 匹配任何请求，因为所有请求都是以"/"开始
  # 但是更长字符匹配或者正则表达式匹配会优先匹配
  [ configuration B ]
}
location ^~ /images/ {
  # 匹配任何以 /images/ 开始的请求，并停止匹配 其它location
  [ configuration C ]
}
location ~* .(gif|jpg|jpeg)$ {
  # 匹配以 gif, jpg, or jpeg结尾的请求.
  # 但是所有 /images/ 目录的请求将由 [Configuration C]处理.   
  [ configuration D ]
}
// 与 react 配合返回固定 html 文件
location / {
  try_files $uri /index.html;
}
```
