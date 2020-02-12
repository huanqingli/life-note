## Linux
### 基本特点
- 一切皆文件，包括硬件和用户
- 不识别扩展名，但是有一些预定俗成的扩展名，是为了给管理员看的
- 挂载：具体的目录连接到 /dev 下面的具体的硬盘
- 环境变量 $PATH ：系统搜索命令的路径。命令都是可执行文件，会自动去环境变量下的路径查找。  
环境变量有好多，命令会从左到右依次查找，执行先找到的。
- 前台与后台任务 [参考](http://www.ruanyifeng.com/blog/2016/02/linux-daemon.html)
- systomd：系统程序控制 [参考](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)
#### 各目录的基本约定
- 系统命令: bin sbin usr/bin usr/sbin 四个目录 sbin 下是超级用户才可以执行的
- 启动目录: boot
- 特殊文件: dev
- 配置文件: etc
- 用户文件夹: home 普通用户 root 超级用户
- 函数库: lib
- 内存数据: proc sys (不要写)
- 系统软件资源保存目录: usr
- 临时目录: tmp
- 系统的可见文档: var 
#### 通配符
- `*` :任意多的任意内容
- `?` :任意一个字符
- `[...]` :[]内列出的一个字符 括号内可以是 0-9 这种
- `[!...]`: 除了[]内以外的字符
- `[[:class:]]`:匹配任意一个属于指定字符类中的字符

- `[:alnum:]`:匹配任意一个字母或数字
- `[:alpha:]`:匹配任意一个字母
- `[:digit:]`:匹配任意一个数字
- `[:lower:]`:匹配任意一个小写字母
- `[:upper:]`:匹配任意一个大写字母

### 基础配置
- 环境变量: 在 .zshrc 文件后边加 `source ~/.bash_profile` 共享 bash 的环境变量

### 用户操作
- 添加用户: `useradd -d /home/huanqing -m -g root huanqing`     
// 新建用户 huanqing  
// -d 设置用户目录为 /home/huanqing -m 生成该目录  
// -g 设置用户属于 root 用户组  
- 新建用户组: `groupadd <group name>`
- 删除用户; `userdel -r <user name>`  
// -r 同时删除用户目录  
- 给用户设置密码: `passwd <user name>`

### FTP 服务
- 启动服务: `sudo service vsftpd start`
- 停止服务: `sudo service vsftpd stop`
- 重启服务: `sudo service vsftpd restart`
- 查看状态: `sudo service vsftpd status`
- [配置](http://os.51cto.com/art/201008/221842.htm)
- 主配置文件位于: `/etc/vsftpd/vsftpd.conf`
- 用户列表: `/etc/vsftpd/user_list`
- 浏览器端登陆: ftp://username:password@192.168.100.254  
没有 username:password@ 认为是匿名登陆。

### MYSQL 服务
- 配置文件位于: `/etc/my.cnf`
- 初始安全设置: `/usr/libexec/mysql56/mysql_secure_installation`
- 查看状态: `sudo service mysqld status`
- 启动服务: `sudo service mysqld start`
- 重启服务: `sudo service mysqld restart`
- 停止服务: `sudo service mysqld stop`

### mongoDB 服务
数据库位于目录: `/var/lib/mongo`
- 启动服务: `sudo service mongod start`  
- 设置自动启动: `sudo chkconfig mongod on`
- 结束服务: `sudo service mongod stop`
- 重启服务: `sudo service mongod restart`
- 查看状态: `sudo service mongod status`
- 查看日志: `sudo cat /var/log/mongodb/mongod.log`
- 删除应用: `sudo yum erase $(rpm -qa | grep mongodb-org)`  
日志: `sudo rm -r /var/log/mongodb`  
库文件: `sudo rm -r /var/lib/mongo`
- 添加管理员:
```sql
use admin
db.createUser(
  {
    user: "root",
    pwd: "123456",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
-- [查看 role 种类](http://www.cnblogs.com/kasumi/p/6086336.html)
-- 授权
use admin   --进这个库才能授权
db.auth("root","123456")
-- 链接时授权
`mongo -u "root" -p "615615" --authenticationDatabase "admin"`
```
