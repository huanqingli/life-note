## webpack
loader 用于对模块的源代码进行转换。
#### 1. loader
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

#### 3. 其他配置
- 模块解析
```javascript
resolve: {
    extensions: ['.js', '.jsx'], //解析没有扩展名模块时可接受的扩展名
  },
```
- [热替换](https://github.com/huanqingli/life-note/blob/master/%E5%8E%9F%E5%88%9B%E6%96%87%E7%AB%A0/%E6%8A%80%E6%9C%AF%E7%B1%BB/react-%E7%83%AD%E6%9B%BF%E6%8D%A2.md)