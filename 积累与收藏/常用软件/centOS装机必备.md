## centOS 装机软件
yum update
- nginx (yum -y install nginx)
- zsh (yum -y install zsh)
- git (yum -y install git)
- oh-my-zsh (`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`)
- zsh-syntax-highlighting (https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)
- nvm (`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`)  
之后添加  
`export NVM_DIR="$HOME/.nvm"`  
`[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm`   
到 ~/.zshrc  
