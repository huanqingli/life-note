## mongoDB
### 基础操作
- 进入 mongo shell：`mongo`
- 启动数据库：`mongod --auth` // 创建超级管理员后 --auth 需要认证权限登录
- 停止 mongo 服务：`use admin` `db.shutdownServer()`
### 权限
- 例：创建超级管理员
```sql
use admin
db.createUser(
  {
    user: "lihuanqing",
    pwd: "615615",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```
- 例：在 reporting 库创建对应权限的角色
```sql
use reporting
db.createUser(
  {
    user: "reportsUser",
    pwd: "12345678",
    roles: [
       { role: "read", db: "reporting" },
       { role: "read", db: "products" },
       { role: "read", db: "sales" },
       { role: "readWrite", db: "accounts" }
    ]
  }
)
```
### 数据迁移/备份/恢复
迁移相当于备份后恢复
* 数据备份:  `mongodump -h <hostname><:port> -d <database> -o <path>`  
-h 后边是主机地址和端口，默认本机27017 -d 后边要备份的库 -o 后边备份文件输出到哪  
* 数据恢复:  `mongorestore -h <hostname><:port> -d <database> -u <username> -p <password> --authenticationDatabase <dbname> <path>`  