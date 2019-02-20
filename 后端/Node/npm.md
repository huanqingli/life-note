### npm
1. npm install 后面除了接包还可以接url
2. 修改开源npm包：最好的办法应当是 fork 原作者的 git 库，在自己所属的 repo 下修复问题后，将 dependencies 中相应的依赖项更改为自己修复后版本的 git url 即可解决问题。
3. node_modules 结构
    - npm2: 每个包就是 node_modules 的一个子目录，他们的依赖又分别在自己的 node_modules 子目录里，这样的好处是结构清晰，坏处是同样的依赖装两份，而且还有依赖的依赖的依赖的...导致路径名巨长
    - npm3: 把依赖的依赖也放到同一个目录级别，得益于 node 的模块加载机制，他们都可以在上一级 node_modules 目录中找到其依赖。npm 3 会在安装时遍历整个依赖树，计算出最合理的文件夹安装方式，使得所有被重复依赖的包都可以去重安装，两个版本冲突的包会根据依赖情况安装到不同的目录层级。
    - npm5: 增加 package-lock.json 文件，记录了 node_modules 里所有包的结构、层级和版本号甚至安装源
4. 配置: 查看配置：`npm config ls -l` 修改配置：`npm config set <key> <value>`
[参考](https://juejin.im/post/5ab3f77df265da2392364341)
[循环依赖](https://juejin.im/post/5a6008c2f265da3e5033cd93)