## CSS Modules
##### 优势：
**局部作用域**
没有全局污染，不再为class名烦恼，选择器权重计数表和混乱的命名成为过去时。
**依赖管理**
用js管理css依赖，组件更加独立，不同CSS Module之间可相互引用、继承。

##### 原则：
**一个class涵盖所有样式**
可以使用composes继承样式（可以继承其他css module的class），不嵌套，不使用选择器。
示例：（更适用于复杂情景，以下场景可用css变量解决）
```css
/* colors.css */
.primary {
  color: #720;
}
.secondary {
  color: #777;
}
/* other helper classes... */

/* submit-button.css */
.common { /* font-sizes, padding, border-radius */ }
.normal {
  composes: common;
  composes: primary from "../shared/colors.css";
}
```

##### 配置
搭配webpack：
```javascript
{
 test: /\.css$/,
 use: [
   {
     loader: 'css-loader',
     options: {
       modules: true,
       localIdentName: '[path][name]__[local]--[hash:base64:5]'
     }
   }
 ]
}
```

##### 用法
- 默认局部作用域

```css
/* colors.css */
.title {
  color: red;
}
```
```javascript
import React from 'react';
import style from './colors.css';

export default () => {
  return (
    <h1 className={style.title}>
      Hello World
    </h1>
  );
};
```
- 声明全局class

```css
:global(.title) {
  color: green;
}
```
- class组合

```css
/* another.css */
.className {
  background-color: blue;
}

.title {
  composes: className;
  color: red;
}
```
可从其他文件引入样式
```css
.title {
  composes: className from './another.css';
  color: red;
}
```
