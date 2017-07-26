## [moment](http://momentjs.com/docs/)
#### 获得时间对象
- 获得当前时间的 moment 时间对象：  
```javascript
const now = moment()
// 等同于
moment(new Date())
```
- 通过字符串获得某时刻 moment 时间对象：  
```javascript
const someDay = moment("1995-12-25")
// 声明字符串格式
moment("12-25-1995", "MM-DD-YYYY")
```
- 通过对象建立 moment 时间对象：
```javascript
const someTime = moment({ year :2010, month :3, day :5, hour :15, minute :10, second :3, millisecond :123})
```
- 通过时间戳获取 moment 时间对象：
```javascript
const someTime = moment(1318781876406)
```
- 通过原生时间对象创建 moment 时间对象：
```javascript
const day = new Date(2011, 9, 16);
const dayWrapper = moment(day);
```
- 通过数组建立 moment 时间对象：
```javascript
// [year, month, day, hour, minute, second, millisecond]
const someTime = moment([2010, 1, 14, 15, 25, 50, 125])
// February 14th, 3:25:50.125 PM
```
- 通过 moment 对象建立 moment 对象：
```javascript
var a = moment([2012, 0, 14]);
var b = moment(a);
// 或者
var b = a.clone();
// 都可用于深度克隆
```
- 比较后获取 早/晚些的 moment 时间对象：
```javascript
// 获取晚一点的时间对象
var a = moment().subtract(1, 'day');
var b = moment().add(1, 'day');
moment.max(a, b);  // b 注意该值返回的是一个 moment 时间对象
// 获取早一点的时间对象
var a = moment().subtract(1, 'day');
var b = moment().add(1, 'day');
moment.min(a, b);  // a 注意该值返回的是一个 moment 时间对象
```

#### 设置与读取时间属性
- 年月日时分秒
```javascript
// 年
moment().year(Number);
moment().year(); // Number
// 月 0 - 11
moment().month(Number|String);
moment().month(); // Number
// 日
moment().date(Number);
moment().date(); // Number
// 时
moment().hour(Number);
moment().hour(); // Number
// 分
moment().minute(Number);
moment().minute(); // Number
// 秒
moment().second(Number);
moment().second(); // Number
// 可以这样获取
moment().get('year');
moment().get('month');  // 0 to 11
moment().get('date');
moment().get('hour');
moment().get('minute');
moment().get('second');
// 可以这样设置
moment().set('year', 2013);
moment().set('month', 3);  // April
moment().set('date', 1);
moment().set('hour', 13);
moment().set('minute', 20);
moment().set('second', 30);
```
- 周几 第几天 第几周
```javascript
// 星期几 0 1 2 3 4 5 6
moment().day(Number|String);
moment().day(); // Number
// 一年中的第几天 1 - 366
moment().dayOfYear(Number);
moment().dayOfYear(); // Number
// 一年中的第几周
moment().week(Number);
moment().week(); // Number
```

#### 修改时间
- 多久之后
```javascript
moment().add(Number, String);
moment().add(Duration);
moment().add(Object);
// 可选增加的单位
years/y
```
