## python版本管理(python环境隔离)
这将是一篇比较短的文章。  
我发文向来注重文章质量，营养不够的宁可不发，但是我相信很多人需要这篇文章。  
之所以要去搞清楚这个问题，是我在把 vscode 的 inspector 设置为 pipenv 生成的虚拟环境是遇到了问题。2018-2月 vscode 添加了对 pipenv 的支持，检测到 Pipfile 以后，会将环境自动切换到当前项目的虚拟环境。但是我的咋就不行呢！我就开始折腾。这是一个比较漫长相信你们都不想经历的过程。希望你们搜到的第一篇文章就是这篇。相关关键字如下: vscode 对 pipenv 的支持, vscode 找不到 pipenv 创建的虚拟环境, vscode pipenv, pipenv vscode ...等等  
希望能给你带来更多营养,我多说点  
不知不觉，上面的内容可能要占本文一半以上了。。。  
pyenv 和 pipenv 应该是目前主流的 python 版本控制和虚拟环境的工具了，下面内容都基于这两个。  
1. 从 PATH 开始。当你要执行终端命令的时候，这个命令是从哪来呢，有个环境变量 PATH 企图hold住这个问题，大部分人打印一下 PATH (echo $PATH) 应该都会发现这样一部分 /usr/local/bin:/usr/bin:/bin 。执行命令时查找循序由左到右，/usr/local/bin 里没找到去 /usr/bin 里找，还没有去 /bin 里看看。
2. 基于此 pyenv 做了些什么呢？他加了个 (pyenv root)/shims 垫片到最左面(具体到 Mac 大多是 /Users/admin/.pyenv/shims 这么个东西)。这就很巧妙了，加了这个，python 啊 pip 啊这些命令都被这个垫片拦截住了，具体用那个版本那个环境全取决于 shims 里面 python 的心情，它指哪就打哪。这就说明了一个问题，只要你使用pyenv 运行 which python 的时候永远都打印 /Users/admin/.pyenv/shims/python 即使它指向的是各种各样的 python 版本！(which pip 同理)
3. pyenv 通过环境变量 PYENV_VERSION 控制 python 指向的版本，也就是 pyenv shell 控制的内容，控制顺序依次是 pyenv shell， pyenv local， pyenv global。前面的覆盖后面的。比如 PYENV_VERSION = 2.5 使用的就是这个 python: $(pyenv root)/versions/2.5/bin/python2.5。
4. 这就是为啥要在 ~/.zshrc 里面加上 eval "$(pyenv init -)，因为要把垫片加到 PATH 的最前面。启用 pyenv 后再打印 PATH 那一大坨你都不想看。
5. 说了这么多还没扯到问题关键呢，怎么搞。vscode 作者之一在git issues 回答了这个问题，用 pyenv 的时候，是无法自动找到 pipenv 创建的虚拟环境的。这就得绕道了，可以直接在 vscode 的配置里加上虚拟环境的路径。类似于 "python.pythonPath": "/Users/admin/.local/share/virtualenvs/......" 这种。
