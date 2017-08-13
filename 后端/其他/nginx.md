## NGINX
### 命令
- 不中断服务的重启(可用作重载配置): `kill -HUP <pid>` 或 `sudo nginx -s reload`
-
### 配置
- 重定向:
```javascript
// 把 dabao.love 重定向到 www.dabao.love
server {
    listen       80;
    server_name  dabao.love;
    return       301 http://www.dabao.love$request_uri;
}
```
