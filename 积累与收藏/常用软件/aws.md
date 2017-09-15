## AWS
### 当前服务器情况
已安装软件:
- nvm
- node             (通过 nvm 管理)
- yarn             (npm安装)
- git
- nginx            (位于 /etc/nginx)
- mysql56-server
- mongodb-org
- vsftpd
- pm2              (npm安装)
- zsh
- oh-my-zsh

### 链接
* 配置 ssh config 在 ~/.ssh/ 目录下
```s
Host        aws

    HostName        18.220.163.96

    User            ec2-user

    IdentityFile    ~/.ssh/MyAWSKeyPair.pem
```
之后通过 ssh aws 链接服务器
* sshfs 挂载: 
`sshfs aws: ~/Documents/remote/aws`(将服务器用户目录挂载到本地 ~/Documents/remote/aws)  
* 取消 sshfs 挂载:  
`umount ~/Documents/remote/aws`

### 配置修改
nginx:
－user nginx;
＋user root;

### aws-cli
- 查看实例详情: `aws ec2 describe-instances --output table`
- 从 s3 上传/下载/删除数据  
```shell
# 以下命令均使用 my-first-backup-bucket 储存桶
# 拷贝本地文件 my-first-backup.bak 到储存桶根目录
aws s3 cp my-first-backup.bak s3://my-first-backup-bucket/
# 从储存桶下载 my-first-backup.bak 到本地根目录
aws s3 cp s3://my-first-backup-bucket/my-first-backup.bak ./
# 从储存桶删除
aws s3 rm s3://my-first-backup-bucket/my-first-backup.bak
```
