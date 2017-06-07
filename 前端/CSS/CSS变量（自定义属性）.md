## CSS变量（自定义属性）
截止2017.04，所有现代浏览器支持CSS变量。
##### 用法
**定义变量**
```css
:root{
  --bgColor:deeppink;
}
```
root伪类下面是全局变量，还可以定义局部变量：局部变量会覆盖全局变量
```css
.content {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}
```
**使用变量**
```css
.main{
  height:100px;
  background:var(--bgColor, #7F583F);
  /* var 的第二个参数为可选参数，找不到变量时提供代替值 */
}
```
如需兼容老式浏览器：
```css
a {
  color: #7F583F;  /* 老式浏览器会使用该值 */
  color: var(--primary);
}
```
##### 用途
除配置颜色方案，基准字号等主题样式，还有以下小技巧：
**配合媒体查询**，不同设备显示不用样式：
```css
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

@media screen and (min-width: 768px) {
  body {
    --primary:  #F7EFD2;
    --secondary: #7F583F;
  }
}
```
利用伪类是相同思路，如`:hover`下重定义的变量在元素 hover 时会代替全局变量。
**与计算属性 calc( ) 一起使用**
```css
:root{
  --margin: 10px;
}
 
div{
  text-indent: calc(var(--margin)*10)
}
```
**在js中直接读取或修改**
```css
:root{
  --testMargin:75px;
}
```
```javascript
var root = getComputedStyle(document.documentElement);
var cssVariable = root.getPropertyValue('--testMargin').trim();

console.log(cssVariable); // 75px
 
document.documentElement.style.setProperty('--testMargin', '100px');
```
