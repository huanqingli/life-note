## centOS 装机软件
### 本机安装
yum update
- nginx (yum -y install nginx)
- zsh (yum -y install zsh)
- git (yum -y install git)
- oh-my-zsh (`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`)
- zsh-syntax-highlighting (https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)
- docker (`https://docs.docker.com/install/linux/docker-ce/centos/#install-using-the-repository`)  
无法正常启动：`rm -rf /var/lib/docker/`
- nvm (`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`)  
之后添加  
`export NVM_DIR="$HOME/.nvm"`  
`[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm`   
到 ~/.zshrc  
- node (nvm install 8)



**********************************************************
先不用 docker 了。。。
### 用 docker 启动服务
- mongo 数据卷 /data/db /data/configdb  
docker run --name mongo-server -p 27017:27017 -v <本机目录>:/data/db -d mongo  
权限系统搞好以后再启动一个  
docker run --name mongo-server -p 27017:27017 -v /data/mongo:/data/db -d mongo mongod --auth
- node