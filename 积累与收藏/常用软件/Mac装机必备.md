## Mac装机软件
### 开发相关
按顺序安装
- xcode：苹果应用开发工具，很多其他开发工具的依赖(xcode-select --install 安装其命令行工具)
- shadowsocks：翻墙工具(https://github.com/shadowsocks/shadowsocks/wiki)
- 终端使用 shadowsocks 代理 [链接](../计算机常识/mac.md)
- chrome：浏览器(https://www.google.com/chrome/)
- vscode: 优质编辑器
- Homebrew: 包管理器(要使用 shadowsocks 代理)
- iTerm2：终端(brew cask install iterm2)
- oh-my-zsh：让终端变强 查看[这里](./oh-my-zsh.md)安装各路插件 z
- zsh-autosuggestions: 自动补全(作为oh-my-zsh插件)
- zsh-syntax-highlighting: 终端命令高亮(作为oh-my-zsh插件)
- powerline: 终端字体(https://github.com/powerline/fonts)
- spaceship: zsh 主题(https://github.com/denysdovhan/spaceship-prompt/)
- thefuck：自动纠错(brew install thefuck)(fuck 显示正确指令)
- ripgrep: 搜索文件内部内容(brew install ripgrep)(rg 搜索内容)
- fd: 按名称搜索文件(brew install fd)
- translate-shell: 终端里的多语言字典(brew install translate-shell)
- tldr: 人性化帮助(brew install tldr)(tldr <命令> 查看该命令的帮助)
- glances: 查看系统状态(brew install glances)
- nvm: node 版本管理器(brew install nvm)
- node: 通过 nvm 安装
- micro: 终端编辑器(brew install micro)
- pyenv: python 版本管理(brew install pyenv 之后 ~/.zshrc 文件结尾添加 `eval "$(pyenv init -)"`)
- python: 通过 pyenv 安装
- pipenv: python 包管理器类似于npm(sudo pip install pipenv)
- mysql: 关系型数据库(brew install mysql)
- sequel-pro: mysql 图形工具(brew cask install sequel-pro)
- sqlitebrowser: sqlite 图形工具
- mongodb: 非关系型数据库(brew install mongodb)
- MongoDB Compass: mongodb 图形工具
- redis: 内存中的数据库(brew install redis)
- RedisDesktopManager: redis客户端
- postman: http请求工具(brew cask install postman)
- SwitchHosts: host管理工具(brew cask install switchhosts)
- docker: 容器(brew cask install docker)

### 生活常用
- appcleaner：删应用
- clearnMyMac：磁盘清理
- omniDiskSweeper：磁盘清理
- iina：视频播放器(brew cask install iina)
- Lepton：github gist(代码片段) 管理客户端(brew cask install lepton)
- cakebrew:homebrew 图形管理工具(brew cask install cakebrew)
- keeweb: 密码管理  
- buku: 命令行书签管理(建立软连接)(brew install buku)
- oneNote：笔记
- whistle: 更 6 的host修改，配合 switchyomega 就是 66666（https://wproxy.org/whistle/）
- motrix: 下载工具，可下百度网盘资源等(brew cask install motrix)
- 有道笔记
- 有道词典
- 百度网盘
- 微信
- QQ

### 选装
- tree：显示目录树(brew install tree)(tree 显示所有 tree -L 1 显示一层)
- fanyi：终端双语字典(npm install fanyi -g)
- boom: 命令行速记本(建立软连接)
- mycli: mysql 命令行工具(brew install mycli)
- httpie: 更友好的 curl(brew install httpie)