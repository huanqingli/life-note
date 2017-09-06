## mongoDB
#### 数据迁移/备份/恢复
迁移相当于备份后恢复
* 数据备份:  `mongodump -h <hostname><:port> -d <database> -o <path>`  
-h 后边是主机地址和端口，默认本机27017 -d 后边要备份的库 -o 后边备份文件输出到哪  
* 数据恢复:  `mongorestore -h <hostname><:port> -d <database> -u <username> -p <password> --authenticationDatabase <dbname> <path>`  