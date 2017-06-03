## react 热替换 ([HMR])
**热替换**好多地方可以用到，目前比较流行的用法是搭配React和webpack实现**在不刷新页面的情况下对模块的增删改**。在给项目添加热替换功能的时候，可以说是踩了各种坑，webpack官方给的配置也有小问题还不得不翻墙去解决（百度出来的一个能打的也没有）。
官方的方案在这儿：https://webpack.js.org/guides/hmr-react/
我先把自己配置成功的贴出来，再说一下如果完全照搬官方配置，会产生的问题：
（只保留热替换相关配置和最基础配置，且只考虑开发不考虑生产，且假设你已安装必要的包）
```javascript
module.exports = {
  entry: [
    'react-hot-loader/patch', // 1
    // 开启 React 代码的模块热替换(HMR)
    './src',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath:'http://localhost:7000/', // 2
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/,
        use:['style-loader', 'css-loader', 'postcss-loader'], // 3
        exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 7000,
    hot: true, // 4
    // 开启服务器的模块热替换(HMR)
    headers: {
      'Access-Control-Allow-Origin': '*', // 5
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 6
    // 开启全局的模块热替换(HMR)

    new webpack.NamedModulesPlugin(), // +
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
  ],
}
```
react 和babel 部分的配置与官方相同即可。
参考官方配置你遇到第一个问题：

```
[HMR] Update failed: SyntaxError: Unexpected token < in JSON at position 0
    at Object.parse (<anonymous>)
    at XMLHttpRequest.request.onreadystatechange
```
这个问题很头疼，因为你去搜索完全找不到有用的东西，而且你看不出来错在哪了，当时的心情真是。。。
最后在 react-hot-loader 的 github 库的 Issues 里翻到了有人和我一样的问题，大快人心。
原来是 output 的 publicPath 出了问题用 `'/'` 是不行滴，要把启动webpack服务的地址填上：`'http://localhost:7000/'`。其实也不能怪官方文档，人家是假设你应用程序和包都托管给 webpack 服务，但是我的只把包托给了 webpack 服务，应用程序是另外启动的 node 服务。好吧这是个比较小众的问题，你要是正好有这个问题，还搜到了这篇文章，那是好福气了。
另外一个
```
XMLHttpRequest cannot load http://localhost:7000/4221731a75de7a449377.hot-update.json. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8000' is therefore not allowed access. The response had HTTP status code 404
```
这个问题只在 webpack 服务发生变动时候有，并不影响HMR使用，所以不管它也可以。
devServer里添加
```
 headers: {
      'Access-Control-Allow-Origin': '*', // 5
    },
```
即可，也是因为应用程序没有托管给 webpack 导致。
如果你的应用程序和包都是托管给 webpack 服务，那就没有这两个问题了。
（话说应用程序一般都是另启服务的吧。。。）
再说一个问题，除了上面两个，是不是这么多配置都是必须的。不配置会导致什么错误。
首先，
```javascript
entry里的
'react-hot-loader/patch', // 1
devServer里的
hot: true, // 4
plugins里的
new webpack.HotModuleReplacementPlugin(), // 6
```
从字面上看就是必须的，不用想，否则不会热。
`    new webpack.NamedModulesPlugin(), // +`只是让控制台输出的更友好，推荐但非必需
这个比较容易忽略：
```javascript
      { test: /\.css$/,
        use:['style-loader', 'css-loader', 'postcss-loader'], // 3
        exclude: /node_modules/ },
```
style-loader 是必须的，否则样式的刷新就不热了。
很多人用 ExtractTextWebpackPlugin 把 css 文件单独弄出来就不用 style-loader了，不过推荐部署应用之前弄一份就行，开发用不着 ExtractTextWebpackPlugin 。
不用 style-loader 修改样式表就不会无刷新更新页面了。不过这一点容易想到。
还有一点就是 babel 配置文件里禁用 modules 很重要，否则导致各种问题，根本别想愉快的开发。这个对应用程序本身使用 import 没有影响，毕竟 webpack2 啥标准都支持，其他地方就用 require 吧。


