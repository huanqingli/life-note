## [moment](http://momentjs.com/docs/)
#### 获得时间对象 及其反向操作
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
// 获取时间字符串
moment().toString();
moment().toISOString();
```
- 通过对象建立 moment 时间对象：
```javascript
const someTime = moment({ year :2010, month :3, day :5, hour :15, minute :10, second :3, millisecond :123})
// 获取对象
moment().toObject();
```
- 通过时间戳获取 moment 时间对象：
```javascript
const someTime = moment(1318781876406)
// 获取时间戳
moment().valueOf();
```
- 通过原生时间对象创建 moment 时间对象：
```javascript
const day = new Date(2011, 9, 16);
const dayWrapper = moment(day);
// 获取原生时间对象
moment().toDate();
```
- 通过数组建立 moment 时间对象：
```javascript
// [year, month, day, hour, minute, second, millisecond]
const someTime = moment([2010, 1, 14, 15, 25, 50, 125])
// February 14th, 3:25:50.125 PM
// 获取数组
moment().toArray();
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
- 多久之 后/前
```javascript
// ..之后
moment().add(Number, String);
moment().add(Duration);
moment().add(Object);
// 可选增加的单位
years/y
months/M
weeks/w
days/d
hours/h
minutes/m
seconds/s
// 举例
moment().add(7, 'days').add(1, 'months'); // with chaining
moment().add({days:7,months:1}); // with object literal
var duration = moment.duration({'days' : 1});
moment([2012, 0, 31]).add(duration); // February 1
//
// ..之前
moment().subtract(Number, String);
moment().subtract(Duration);
moment().subtract(Object);
// 可用单位和用法同上
```

- 得到 起始/结束 时间
```javascript
moment().startOf(String);
// 可用单位
moment().startOf('year');    // set to January 1st, 12:00 am this year
moment().startOf('month');   // set to the first of this month, 12:00 am
moment().startOf('quarter');  // set to the beginning of the current quarter, 1st day of months, 12:00 am
moment().startOf('week');    // set to the first day of this week, 12:00 am
moment().startOf('isoWeek'); // set to the first day of this week according to ISO 8601, 12:00 am
moment().startOf('day');     // set to 12:00 am today
moment().startOf('date');     // set to 12:00 am today
moment().startOf('hour');    // set to now, but with 0 mins, 0 secs, and 0 ms
moment().startOf('minute');  // set to now, but with 0 seconds and 0 milliseconds
moment().startOf('second');  // same as moment().milliseconds(0);
// 结束时间接口为
moment().endOf(String);
// 可用单位同上
```

#### 显示时间/获取信息
- 设置时区  
`moment().zone(-8)`为北京时区，不设置默认为本机时间。  
- 格式化某 moment 时间对象  
[点击查阅字母代表的格式](http://momentjs.com/docs/#/displaying/format/)
```javascript
// 举例
moment().format();                                // "2014-09-08T08:02:17-05:00" (ISO 8601)
moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
moment().format("ddd, hA");                       // "Sun, 3PM"
moment('gibberish').format('YYYY MM DD');         // "Invalid date"
moment().format('[today] dddd'); // 'today Sunday'
// x 参数获取毫秒时间戳 X 获取秒时间戳
```
- [距离 现在/某时刻 多久](http://momentjs.com/docs/#/displaying/fromnow/)
- 获取时间差
```javascript
// a 比 b 晚多久
// 默认毫秒
var a = moment([2007, 0, 29]);
var b = moment([2007, 0, 28]);
a.diff(b) // 86400000
// 可设置单位
var a = moment([2007, 0, 29]);
var b = moment([2007, 0, 28]);
a.diff(b, 'days') // 1
```
- 获取时间戳
```javascript
// 获取毫秒时间戳
moment().valueOf()
// 获取秒时间戳
moment().unix();
```
- 获取 js原生时间对象
```javascript
moment().toDate();
```
- 某月有多少天
```javascript
moment("2012-02", "YYYY-MM").daysInMonth() // 29
moment("2012-01", "YYYY-MM").daysInMonth() // 31
```
