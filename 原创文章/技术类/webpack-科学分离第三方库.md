#### CommonsChunkPlugin并不是分离第三方库的好办法（DllPlugin科学利用浏览器缓存）
**[webpack](https://github.com/huanqingli/life-note/blob/master/%E5%89%8D%E7%AB%AF/%E5%85%B6%E4%BB%96%E5%B7%A5%E5%85%B7/webpack.md)算是个磨人的小妖精了。**之前一直站在glup阵营，使用browserify打包，发现webpack已经火到爆炸，深怕被社区遗落，赶紧拿起来把玩一下。本来只想玩一下的。尝试打包了以后，就想启个webpack服务器，之后就想添加[热替换](https://github.com/huanqingli/life-note/blob/master/%E5%8E%9F%E5%88%9B%E6%96%87%E7%AB%A0/%E6%8A%80%E6%9C%AF%E7%B1%BB/react-%E7%83%AD%E6%9B%BF%E6%8D%A2.md)，什么css文件单独拆分，各种 loader 处理优化打包结果，各种 source-map 有什么不同，一个都不能少。其中添加热替换时候，因为应用的服务器和webpack服务器没有使用同一个，产生了一点波折。然后就到了今天这个主题了。
**逐步展开今天的主题：**
**为什么要分离第三方库？**
这个好处显而易见，第三方库是比较稳定的，不会轻易改变，利用浏览器缓存后，用户再次加载页面会减少服务器请求，提高速度优化体验。提取多个应用（入口）公共模块的作用和他类似，公共部分会被缓存，所有应用都可以利用缓存内容从而提高性能。
**分离第三方库就能利用浏览器换缓存了么？**
同样显而易见是否定的，导致无法利用缓存的因素有很多，比如最明显的有可能你每次分离的库文件重新打包都会得到不同的名称，这个比较容易发现，再比如说后台的同事给js文件设置的缓存过期时间为0，这就尴尬了，但0就不能利用缓存了么？并不是，只要文件是完全不变的，注意是完全不变，包括修改时间，依然会利用缓存，性能飞起。想利用缓存必须先了解缓存，这里简单提一下：
**浏览器缓存机制是什么样的？**
HTTP1.1给的策略是使用Cache-control配合Etag，  
Cache-control设置举例：  
'Cache-Control': 'public, max-age=600'，  
max-age即过期时间，如果已过期的话，还会查看Etag，
ETag的值：  
Apache中，ETag的值默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的。  
如果Etag相同，依然不会请求新资源，而会使用以前的文件。
**CommonsChunkPlugin 到底是用来干什么的？**
字面理解，提取公共包，公共包那就是不只一个地方使用喽，单页应用（单入口）的库只有他自己使用，不能算公共包吧？这个插件提取的公共包，每次是会重新打包的（Etag会不同），无论是节约打包时间，（虽然微不足道的时间但毕竟是无用功：库根本没变么），还是对浏览器缓存的利用（万一 max-age 过期了你就放弃缓存了么？）都不是好的方案。最佳方案浮出水面：**DllPlugin**
**DllPlugin有什么优势？**
只对库文件打包一次。也就是说，只要库文件不变，只需要打包一次，以后再打包业务代码和库文件没关系啦，这样一来真正做到了库文件永远是那个库文件，只要库文件不变，缓存永远有效（Etag不变），打起包来把库丢到脑后，神清气爽。介绍一下最简单的使用方式：
首先另写一个 webpack 配置文件，毕竟是单独打包库了，假设 **webpack.config.dll.js**
```javascript
const path = require('path')
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-hot-loader', 'immutable', 'redux', 'react-redux', 'react-router-dom', 'redux-logger',
      'redux-persist', 'redux-persist-transform-immutable', 'redux-thunk'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'public'),
    library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'public/manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',
    }),
  ],
}
```
在原来的配置文件中添加 **DllReferencePlugin** 插件
```javascript
new webpack.DllReferencePlugin({
      manifest: require('./public/manifest.json'), // 指定manifest.json
      name: 'vendor',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    }),
```
终端先运行：  
`webpack -p --progress --config ./webpack.config.dll.js`
把库文件先打个包，只要库不变，以后就用这个包了，再打包业务代码，完活。
**推荐策略：**
各行其是。  
如果是单页应用，那只用DllPlugin打包库文件即可，业务代码一个包搞定。  
如果是多页应用，DllPlugin打包完库文件，开发时可能会用很多公共的业务代码而且可能随时变动，这就要利用CommonsChunkPlugin来做他本该做的事，再把公共业务提取出来，至于缓存，起码在页面间切换时，公共部分还是会被缓存的。
我的另一篇文章，[React热替换](https://github.com/huanqingli/life-note/blob/master/%E5%8E%9F%E5%88%9B%E6%96%87%E7%AB%A0/%E6%8A%80%E6%9C%AF%E7%B1%BB/react-%E7%83%AD%E6%9B%BF%E6%8D%A2.md)
