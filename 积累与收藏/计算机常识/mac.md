## Mac
#### 日常使用
- 文件共享，偏好设置，共享，打开文件共享。另一台电脑 finder 前往 服务器 smd://<ip> (被共享电脑的局域网ip)

#### 系统快捷键
- `ctrl-left [right]`: 左右切换桌面。
- `ctrl-up`: 查看当前桌面窗口。
- `ctrl-down`: 查看当前应用窗口。

#### 终端操作
- `Command+Shift+.`: 显示隐藏文件夹。
- `chsh -s /bin/zsh`: 修改默认shell为zsh,改回bash同理。
- `ifconfig`: 查看各种地址。
- 开启，关闭 shadowsocks 代理 .zshrc 里添加
```shell
alias proxy='export all_proxy=socks5://127.0.0.1:1080'
alias unproxy='unset all_proxy'
```
后通过 proxy unproxy 开启关闭代理
