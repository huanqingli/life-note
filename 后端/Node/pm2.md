## pm2
这个要全局安装，否则第一次安装的位置会作为他的全局变量，以后每次启动都会去那里找模块，删除那个项目后会无法正常启动 pm2   
解决办法: 清理 pm2 应用环境变量: `rm -rf ~/.pm2`
### 命令汇总
```bash
pm2 update                         # 更新pm2
pm2 start app.js                   # 启动应用
pm2 start app.js --name="api"      # 启动应用命名为 api
pm2 start app.js -i 4              # 集群方式启动 4 个实例
pm2 start app.js -i max            # 根据 cpu 启动最多实例
pm2 start app.js --watch           # 文件发生变化时重新启动
pm2 reload all                     # 不当机重启集群
pm2 restart all                    # 重启所有 app
pm2 restart [id/app-name]          # 重启某 app
# 进程监控
pm2 list                           # 列出所有启动的进程
pm2 monit                          # 打印每个应用 CPU 占用情况
pm2 show [id/app-name]             # 打印这个应用的所有信息
# 日志管理
pm2 logs                           # 打印所有应用日志
pm2 logs [id/app-name]             # 打印某个应用的日志
pm2 flush                          # 清空日志
# 停止与关闭
pm2 stop all                       # 停止所有应用
pm2 stop [id/app-name]             # 停止某 app
pm2 delete all                     # 在 pm2 里清除所有 app
pm2 delete [id/app-name]           # 在 pm2 里清除某 app
```
