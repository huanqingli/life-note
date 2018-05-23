## yum
- 更新软件包: `sudo yum update`  
后面接包名更新特定包，不接更新全部包  
- 管理储存库:
    - 列出现有储存库及其当前状态:`yum repolist all`
    - 添加储存库:`sudo yum-config-manager --add-repo <储存库 url >`
    - 启用储存库:`sudo yum-config-manager --enable <储存库名称>`
    - 禁用储存库: `sudo yum-config-manager --disable <储存库名称>`
- 搜索软件包: `sudo yum search <要搜索的包>`
- 查看已经安装的软件包: `yum list installed`
- 查看最近安装的：`yum list recent`
- 查看 已安装/可安装 的软件包组: `yum grouplist`
- 查看软件包组中的包: `yum groupinfo <包组>`
- 安装软件包: `sudo yum install <包名>`
- 安装软件包组: `yum groupinstall <组名>`
- 删除软件包: `yum remove <包名>`
- 查看历史操作：`yum history list [可加搜索条件]`
- 撤销历史操作：`yum history undo <id>`  
填写查到的id，可用于彻底删除某软件及其依赖，把安装的历史清除，相当于没装过
- 删除软件包组: `yum groupremove <组名>`
- 查询包信息: `yum info <包名>`
- 清理缓存：`yum clean all`
- [到配置文件里修改](http://blog.csdn.net/im5437/article/details/53445142)  
安装某些仓库没有的包到 /etc/yum.repos.d 目录下增加.repo文件 修改禁用状态等  
配置文件位于 /etc/yum.conf

- 选项：`-y` 对所有问题回答yes