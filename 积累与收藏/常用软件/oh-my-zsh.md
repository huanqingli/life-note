## oh-my-zsh

#### [Cheatsheet](https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet)
- **zsh_stats**: 列出最常用的20条命令
- **d**: 列出最近访问的文件夹，输入对应数字，确认后前往该文件夹
- **无需cd**：前往某文件不需要cd
- **tab**： 自动补全提示

#### 修改主题
[浏览主题（官方）](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)  
主题设置：根目录里 .zshrc 文件中（第10行） ZSH_THEME= 后边接主题，推荐 "ys"  
小tips：可以设置 ZSH_THEME="random" 每次随机选一个主题  

#### 插件系统
[插件列表（官方）](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins)和 [简介（官方）](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins)  
启动插件：plugins=(rails git ruby ...其他插件)  
常用插件：
- last-working-dir： 自动进入上次工作的目录。
- web-search： 使用默认浏览器搜索，例如，`baidu 知乎`
- z: 模糊匹配路径，（匹配通过cd访问过的路径）
- h: 查看历史命令，`h` 查看所有历史命令，`hsi xxx` 查看带有xxx的历史命令
- osx: [mac终端的小工具](#osx)
- git: git支持[全部别名](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugin:git) [常用别名](#git)



- *wd*： [快捷路径跳转](#wd)（被 z 替代）
- *extract*： 解压缩

非内置插件：
- zsh-syntax-highlighting： 命令高亮，提示错误，合法路径等
安装：` git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`
在 plugins 里添加到最后一个


插件使用：
##### wd
- 记录当前路径的简写为xxx： wd add xxx
- 从任何目录进入简写为xxx的目录： wd xxx
- 删除简写为xxx的快捷进入方式： wd rm xxx
- 列出所有快捷进入方式： wd list
- 获取帮助： wd help

##### osx
- 在 Finder 中打开当前目录： ofd
- 前往当前 Finder 中打开的目录： cdf

##### git
