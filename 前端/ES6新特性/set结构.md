## SET结构
新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值：
```js
var s = new Set();

[2,3,5,4,5,2,2].map(x => s.add(x))

for (let i of s) {console.log(i)}
// 2 3 5 4
```
### 方法
- add(value) : 添加值，返回 set 结构本身
- delete(value) : 删除值，返回是否删除成功
- has(value) : 检查值，返回 set 结构中是否有该成员
- clear() : 清空值，无返回值
- forEach() : 遍历 set 内容
- 可以使用扩展运算符
### 遍历
```js
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```
且与数组一样拥有 `forEach()` 方法
### 与数组的关系
可与数组之间方便的切换
```js
let set = new Set(['red', 'green', 'blue']);

let arr = [...set];
let arr = Array.from(set);// 与上一句相同
// ['red', 'green', 'blue']
```
利用与数组间的切换，使用数组的方法
```js
// 使用 map 和 filter 方法

let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
```
利用与数组间的切换，实现多种功能(交集，差集，并集，去重等)
```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// [1, 2, 3, 4]

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// [2, 3]

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// [1]

// 去重	
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1,1,2,3]) // [1, 2, 3]
```