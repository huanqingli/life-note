## NGINX
### 命令
- 启动 nginx 服务: `sudo service nginx start`
- 不中断服务的重启(可用作重载配置): `kill -HUP <pid>` 或 `sudo nginx -s reload`
- 查看当前配置和存放位置：`sudo nginx -t`
- 查看 nginx 服务器运行状态 `service nginx status`
- 加入开机自启动列表: `sudo chkconfig --add /etc/init.d/nginx`
### 配置
user root;
给 nginx 所有权限，默认 user nginx。  
默认配置文件位于 /etc/nginx 主配置文件 nginx.conf  
写配置千万别忘结尾了 ; 这个符号  
- 重定向:
```shell
// 把 dabao.love 重定向到 www.dabao.love 反之同理
server {
    listen       80;
    server_name  dabao.love;
    return       301 $scheme://www.dabao.love$request_uri;
}
```
– 路径匹配:
```shell
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
# 与 react 配合返回固定 html 文件
location / {
  try_files $uri /index.html;
}
# 重定向某个页面
location = /oldpage.html {
  return 301 http://example.org/newpage.html;
}
# 只允许来自 local 的访问
location /local {
    allow 127.0.0.1;
    deny all;
}
```
- 解决不显示图片的问题
```shell
location ~* ^.+\.(jpg|jpeg|gif|png|bmp)$ {  
        access_log off;  
        root html;  
        expires 30d;  
        break;  
        }
```
- 设置压缩
```shell
# 开启gzip
gzip on;
# 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
gzip_min_length 1k;
# gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
gzip_comp_level 2;
# 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;
# 禁用IE 6 gzip
gzip_disable "MSIE [1-6]\.";
```
- 文件缓存
```conf
open_file_cache max=1000 inactive=20s;
open_file_cache_valid 30s;
open_file_cache_min_uses 2;
open_file_cache_errors on;
```
