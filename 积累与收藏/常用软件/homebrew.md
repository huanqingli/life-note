##Homebrew
[地址](https://brew.sh/index_zh-cn.html)
- 安装： `brew install < package >`
- 卸载： `brew uninstall < package >`
- 查找包： `brew search < package >`
- 查看已安装的软件：`brew list`
- 安装软件的目录： /usr/local/Cellar
- 更新自己： `brew update`
- 更新安装的包： `brew upgrade < package >` 不加包名更新所有
- 清除旧的包(homebrew会自动保留历史版本)：`brew cleanup < package >` 不加包名清除所有
- 查看包信息：`brew info < package >`
- 查看配置信息： `brew config`
- 检查 brew 的潜在风险：`brew doctor`
- 安装二进制包：`brew cask install < package >`
- homebrew 自身的位置：`brew --repo`(/usr/local/Homebrew)

- 进入 homebrew 仓库：`cd "$(brew --repo)"`
- 替换 homebrew 的源：`git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git`(为了 update 快)