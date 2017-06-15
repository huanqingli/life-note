## webpack

#### 1. loader
loader 用于对模块的源代码进行转换。
- css-loader
在js中加载css文件。  
内置cssnano压缩，配置options: { minimize: true }
- style-loader
将js中加载的css文件添加到HTML中。
- postcss-loader
通过各种插件预处理css文件，例如：  
autoprefixer自动添加浏览器前缀。

示例：
```javascript
module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/,
        use: TextPlugin.extract([{ loader: 'css-loader', options: { minimize: true } }, 'postcss-loader']),
        exclude: /node_modules/ },
      // { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'], exclude: /node_modules/ },
    ],
  },
```

#### 2. plugins
解决 loader 无法实现的其他事。
- extract-text-webpack-plugin **用于从包中单独提取css文件**
```javascript
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//
module.exports = {
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          }
        ]
    },
    plugins: [
    	new ExtractTextPlugin("styles.css"),
    ]
}
```
- DefinePlugin **用于定义全局常量**
```javascript
new webpack.DefinePlugin({
      SERVER: JSON.stringify('http://dev.example.com'),
    }),
```
- ProvidePlugin **自动加载模块**
```javascript
    new webpack.ProvidePlugin({
      React: 'react',
    }), //之后使用React无需引入模块，只有使用该变量时才会引入该模块
```
- HtmlWebpackPlugin **给HTML文件自动添加script和link标签**
```javascript
new HtmlWebpackPlugin({
      template: './src_basic/index.html',
      filename: '../index.html',
    }) //用于生产环境
```
- CommonsChunkPlugin**多入口文件提取公共代码**
```javascript
module.exports = {
    entry: {
        p1: "./page1",
        p2: "./page2",
        p3: "./page3",
        ap1: "./admin/page1",
        ap2: "./admin/page2"
    },
    output: {
        filename: "[name].js"
    },
    plugins: [
         new webpack.optimize.CommonsChunkPlugin({
            name:"commons.js",
         // minChunks: 2,
         //(模块必须被2个 入口chunk 共享)
            chunks: ["p1", "p2","p3"],
         // (只使用这些 入口chunk)
        },
        new webpack.optimize.CommonsChunkPlugin({
			name:"admin-commons.js",
            chunks: ["ap1", "ap2"],
        },
    ]
};
//单独打包库文件：（不推荐，推荐使用 DllPlugin 分离库文件）
module.exports = {
	entry: {
		app: './app.js',
		vendor: ['react', 'react-dom', 'react-hot-loader', 'immutable', 'redux', 'react-redux', 'react-router-dom'],
	},
	//其他配置
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        })
	]
}
```
- DllPlugin**单独打包库** 更好的利用浏览器缓存
```javascript
//打包库文件的单独配置
const path = require('path')
const webpack = require('webpack');
//
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
//打包应用文件时使用
  new webpack.DllReferencePlugin({
      manifest: require('./public/manifest.json'), // 指定manifest.json
      name: 'vendor',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    }),
```
关于[分离第三方库](https://github.com/huanqingli/life-note/blob/master/%E5%8E%9F%E5%88%9B%E6%96%87%E7%AB%A0/%E6%8A%80%E6%9C%AF%E7%B1%BB/webpack-%E7%A7%91%E5%AD%A6%E5%88%86%E7%A6%BB%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93.md)

#### 3. 其他配置
- 模块解析
```javascript
resolve: {
    extensions: ['.js', '.jsx'], //解析没有扩展名模块时可接受的扩展名
  },
```
- 调试工具添加模块信息
```javascript
devtool: "cheap-module-source-map", 
```
- [热替换](https://github.com/huanqingli/life-note/blob/master/%E5%8E%9F%E5%88%9B%E6%96%87%E7%AB%A0/%E6%8A%80%E6%9C%AF%E7%B1%BB/react-%E7%83%AD%E6%9B%BF%E6%8D%A2.md)

- 命令行使用指定配置文件进行构建：
`webpack --config example.config.js`

#### 4. 配置示例
```javascript
module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch', // 1
      // 开启 React 代码的模块热替换(HMR)
      './src_basic',
    ],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'public'),
    // publicPath: '/public/',
    publicPath: isProd ? '/public/' : 'http://localhost:7000/', // 2
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/,
        use: isProd ? TextPlugin.extract([
          { loader: 'css-loader', options: { minimize: true, modules: true, localIdentName: '[hash:base64:8]' } },
          { loader: 'postcss-loader', options: { plugins: [require('autoprefixer')] } }]) :
        ['style-loader',
          { loader: 'css-loader',
            options: { modules: true, localIdentName: '[name]__[local]--[hash:base64:5]' } },
          {
            loader: 'postcss-loader',
            options: { plugins: [require('autoprefixer')] },
          }], // 3
        exclude: /node_modules/ },
      // { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'], exclude: /node_modules/ },
    ],
  },
  devtool: isProd ? false : 'cheap-module-source-map', // 报错时追踪到原文件位置
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 7000,
    hot: true, // 4
    // 开启服务器的模块热替换(HMR)
    headers: {
      'Access-Control-Allow-Origin': '*', // 5
      'Cache-Control': 'public, max-age=0',
    },
  },
  plugins: [
    new TextPlugin('css/styles.css'),
    //
    new webpack.HotModuleReplacementPlugin(), // 6
    // 开启全局的模块热替换(HMR)
    new webpack.NamedModulesPlugin(), // +
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    //
    new webpack.DefinePlugin({
      SERVER: JSON.stringify('http://dev.example.com'),
    }), // 定义全局常量,全局变量在data文件中
    new webpack.ProvidePlugin({
      React: 'react',
      _: 'lodash',
    }), // 自动引入库
    new HtmlWebpackPlugin({
      template: './src_basic/index.html',
      filename: '../index.html',
    }), // 给HTML文件自动添加所需的script和link标签
    new webpack.DllReferencePlugin({
      manifest: require('./public/manifest.json'), // 指定manifest.json
      name: 'vendor',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    }),
  ],
}
```
生产环境isProd为1
