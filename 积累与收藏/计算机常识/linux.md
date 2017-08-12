## Linux
### 基础命令
- 查看服务器时间: `date -R`
- 查看目录下的文件: `ls <路径>`  
`ls -la` 还会查看上次访问文件的用户，解决权限问题
- 切换到目录: `cd <路径>`
- 显示当前目录: `pwd`
- 创建目录: `mkdir <目录名>`
- 删除空目录: `rmdir <目录名>`
- 拷贝文件: `cp <从哪> <到哪>`
- 移除文件或目录: `rm <文件或目录>`
- 移动: `mv <文件> <目录>`
- 改名: `mv <文件/目录> <文件/目录>`
- 查看磁盘用量: `df -h`
- 重启: `sudo reboot`
- 查看端口情况: `netstat -tpln`
- 查看某应用进程: `ps -ef |grep <应用名>`
- 查找内容: `whereis <内容>`

### yum
- 更新软件包: `sudo yum update`  
后面接包名更新特定包，不接更新全部包  
- 管理储存库:
    - 列出现有储存库及其当前状态:`yum repolist all`
    - 添加储存库:`sudo yum-config-manager --add-repo <储存库 url >`
    - 启用储存库:`sudo yum-config-manager --enable <储存库名称>`
- 搜索软件包: `sudo yum search <要搜索的包>`
- 产看已经安装的软件包: `yum list installed `
- 查看 已安装/可安装 的软件包组: `yum grouplist`
- 查看软件包组中的包: ` yum groupinfo <包组>`
- 安装软件包: `sudo yum install <包名>`
- 安装软件包组: `yum groupinstall <组名>`
- 删除软件包: `yum remove &#124; erase <包名>`
- 删除软件包组: `yum groupremove <组名>`
- 查询包信息: `yum info`
- [到配置文件里修改](http://blog.csdn.net/im5437/article/details/53445142)  
安装某些 amzn 仓库没有的包到 /etc/yum.repos.d 目录下增加.repo文件

### 操作 MYSQL
- 配置文件位于: `/etc/my.cnf`
- 初始安全设置: `/usr/libexec/mysql56/mysql_secure_installation`
- 查看状态: `sudo service mysqld status`
- 启动服务: `sudo service mysqld start`
- 重启服务: `sudo service mysqld restart`
- 停止服务: `sudo service mysqld stop`

### 操作 mongoDB  
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
