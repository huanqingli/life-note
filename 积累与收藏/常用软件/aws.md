## AWS
### 当前服务器情况
已安装软件:
- nvm
- node             (通过 nvm 管理)
- yarn             (npm安装)
- git
- nginx            (位于/etc/nginx)
- mysql56-server
- mongodb-org
- vsftpd
- pm2              (npm安装)

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
