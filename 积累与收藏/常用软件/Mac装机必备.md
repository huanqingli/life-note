## Mac装机软件
按顺序安装
- xcode：苹果应用开发工具，很多其他开发工具的依赖(xcode-select --install 安装其命令行工具)
- Homebrew: 包管理器
- iTerm2：终端
- oh-my-zsh：让终端变强 查看[这里](./oh-my-zsh.md)安装各路插件
- zsh-syntax-highlighting: 终端命令高亮(作为oh-my-zsh插件)
- thefuck：自动纠错(brew install thefuck)(fuck 显示正确指令)
- ripgrep: 搜索文件内部内容(brew install ripgrep)(rg 搜索内容)
- fd: 按名称搜索文件(brew install fd)
- translate-shell: 终端里的多语言字典(brew install translate-shell)
- tldr: 人性化帮助(brew install tldr)(tldr <命令> 查看该命令的帮助)
- glances: 查看系统状态(brew install glances)
- nvm: node 版本管理器(作为oh-my-zsh插件)
- node: 通过 nvm 安装
- micro: 终端编辑器(brew install micro)
- pyenv: python 版本管理(brew install pyenv 之后 ~/.zshrc 文件结尾添加 `eval "$(pyenv init -)"`)
- python: 通过 pyenv 安装
- pipenv: python 包管理器类似于npm(pip install pipenv)
- mysql: 关系型数据库(brew install mysql)
- sequel-pro: mysql 图形工具(brew cask install sequel-pro)
- sqlitebrowser: sqlite 图形工具
- vscode: 优质编辑器
- appcleaner：删应用
- omniDiskSweeper：磁盘清理
- keeweb: 密码管理  
- buku: 命令行书签管理
- boom: 命令行速记本

### 选装
- tree：显示目录树(brew install tree)(tree 显示所有 tree -L 1 显示一层)
- fanyi：终端双语字典(npm install fanyi -g)