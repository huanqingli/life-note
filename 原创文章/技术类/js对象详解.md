## js对象详解(JavaScript对象深度剖析，深度理解js对象)
这算是酝酿很久的一篇文章了。  
JavaScript作为一个基于对象(没有类的概念)的语言，从入门到精通到放弃一直会被**对象**这个问题围绕。  
平时发的文章基本都是开发中遇到的问题和对最佳解决方案的探讨，终于忍不住要写一篇基础概念类的文章了。  
本文探讨以下问题，在座的朋友各取所需，欢迎批评指正:  
1. [创建对象](#创建对象)
2. [`__proto__`与prototype](#proto与prototype)
3. [继承与原型链](#继承与原型链)
4. [对象的深度克隆](#对象的深度克隆)
5. [一些Object的方法与需要注意的点](#一些object的方法与需要注意的点)
6. [ES6新增特性](#es6新增特性)

下面反复提到实例对象和原型对象，通过构造函数 new 出来的本文称作 实例对象，构造函数的原型属性本文称作 原型对象。
### 创建对象
* 字面量的方式:  
```js
var myHonda = {color: "red", wheels: 4, engine: {cylinders: 4, size: 2.2}}
```
就是`new Object()`的语法糖，一样一样的。
* 工厂模式:  
```js
function createCar(){    
  var oTemp = new Object();    
  oTemp.name = arguments[0];
  //直接给对象添加属性，每个对象都有直接的属性    
  oTemp.age = arguments[1];    
  oTemp.showName = function () {        
    alert(this.name);    
  };//每个对象都有一个 showName 方法版本    
  return oTemp;
};
var myHonda = createCar('honda', 5)
``` 
只是给`new Object()`包了层皮，方便量产，并没有本质区别，姑且算作创建对象的一种方式。  
* 构造函数:
```js
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.getName = function() {
    return this.name;
  };
}
var rand = new Person("Rand McKinnon", 33, "M");
```
上面构造函数的 getName 方法，每次实例化都会新建该函数对象，还形成了在当前情况下并没有卵用的闭包，所以构造函数添加方法用下面方式处理，工厂模式给对象添加方法的时候也应该用下面的方式避免重复构造函数对象  
```js
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.getName = getName
}
function getName() {
  return this.name;
};
```
构造函数创建对象的过程和工厂模式又是半斤八两，相当于隐藏了创建新对象和返回该对象这两步，构造函数内 this 指向新建对象，没什么不同。  
最大不同点: 构造函数创造出来的对象 constructor 属性指向该构造函数，工厂模式指向 `function Object(){...}`。  
构造函数相当于给原型链上加了一环，构造函数有自己的 prototype，工厂模式就是个普通函数。说到这儿我上一句话出现了漏洞，工厂模式的 constructor 指向哪得看第一句话 new 的是什么。  
构造函数直接调用而不 new 的话，就看调用时候 this 指向谁了，直接调用就把属性绑到 window 上了，通过 call 或者 apply 绑定到其他对象作用域就把属性添加到该对象了。  
* 原型模式:  
构造函数虽然在原型链上加了一环，但显然这一环啥都没有啊，这样一来和工厂模式又有什么区别？加了一环又有什么意义？原型模式浮出水面。  
```js
function Car(){} 
//用空构造函数设置类名
Car.prototype.color = "blue";//每个对象都共享相同属性
Car.prototype.doors = 3;
Car.prototype.drivers = new Array("Mike","John");
Car.prototype.showColor = function(){        
  alert(this.color);
};//每个对象共享一个方法版本，省内存。
//构造函数的原型属性可以通过字面量来设置，别忘了通过 Object.defineProperty()设置 constructor 为该构造函数
function Car(){} 
Car.prototype = {
  color:"blue",
  doors:3,
  showColor:function(){        
    alert(this.color);
  }
}
Object.defineProperty(Car.prototype, "constructor", { enumerable:false, value:Car })
//(不设置 constructor 会导致 constructor 不指向构造函数，直接设置 constructor 会导致 constructor 可枚举)
```
使用原型模式注意动态性，通过构造函数实例化出的对象，他的原型对象是构造函数的 prototype ，如果在他的原型对象上增加或删除一些方法，该对象会继承这些修改。例如，先通过构造函数 A 实例化出对象 a ，然后再给 A.prototype 添加一个方法，a 是可以继承这个方法的。但是给 A.prototype 设置一个新的对象，a 是不会继承这个新对象的属性和方法的。听起来有点绕，修改 A.prototype 相当于直接修改 a 的原型对象，a 很自然的会继承这些修改，但是重新给 A.prototype 赋值的话，修改的是构造函数的原型，并没有影响 a 的原型对象！a 被创建出来以后原型对象就已经确定了，除非直接修改这个原型对象(或者这个原型对象的原型对象)，否则 a 是不会继承这些修改的！
* Object.create()
传入要创建对象实例的原型对象，和原型模式几乎是一个意思也是相当于在原型链上加了一环，区别在于这种方式创建的对象没有构造函数。这种方式相当于:  
```js
function object(o){
    function F(){}
    F.prototype = o;
    return new F()
}
```
相当于构造函数只短暂的存在了一会，创建出来的对象的 constructor 指向 原型对象 o 的 constructor ！
* 混合模式:  
使用原型模式时，当给实例对象设置自己专属的属性的时候，该实例对象会忽略原型链中的该属性。但当原型链中的属性是引用类型值的时候，操作不当有可能会直接修改原型对象的属性！这会影响到所有使用该原型对象的实例对象！  
大部分情况下，实例对象的多数方法是共有的，多数属性是私有的，所以属性在构造函数中设置，方法在原型中设置是合适的，构造函数与原型结合使用是通常的做法。  
还有一些方法，无非是工厂模式与构造函数与原型模式的互相结合，在生成过程和 this 指向上做一些小变化。 
* class 方式:  
见下面 [ES6](#es6新增特性) class 部分，只是一个语法糖，本质上和构造函数并没有什么区别，但是继承的方式有一些区别。

### proto与prototype
这两个到底是什么关系？搞清楚 实例对象 构造函数 原型对象 的三角关系，这两个属性的用法就自然清晰了，顺便说下 constructor。  
构造函数创建的实例对象的 constructor 指向该构造函数(但实际上 constructor 是对应的原型对象上的一个属性！所以实例对象的 constructor 是继承来的，这一点要注意，如果利用原型链继承，constructor 将有可能指向原型对象的构造函数甚至更上层的构造函数，其他重写构造函数 prototype 的行为也会造成 constructor 指向问题，都需要重设 constructor)，构造函数的 prototype 指向对应的原型对象，实例对象的 `__proto__` 指对应的原型对象，`__proto__`是浏览器的实现，并没有出现在标准中，可以用 constructor.prototype 代替。考虑到 Object.create() 创建的对象，更安全的方法是 Object.getPrototpyeOf() 传入需要获取原型对象的实例对象。  
我自己都感觉说的有点乱，但是他们就是这样的，上一张图，看看能不能帮你更深刻理解这三者关系。  
![三角关系](http://owel7ec6g.bkt.clouddn.com/jsObject.jpg)

### 继承与原型链
当访问一个对象的属性时，如果在对象本身找不到，就会去搜索对象的原型，原型的原型，知道原型链的尽头 null，那原型链是怎么链起来的？  
把 实例对象 构造函数 原型对象 视为一个小组，上面说了三者互相之间的关系，构造函数是函数，可实例对象和原型对象可都是普通对象啊，这就出现了这样的情况:  
这个小组的原型对象，等于另一个小组实例对象，而此小组的原型对象又可能是其他小组的实例对象，这样一个个的小组不就连接起来了么。举个例子:
```js
function Super(){
  this.val = 1;
  this.arr = [1];
}
function Sub(){
  // ...
}
Sub.prototype = new Super(); 
```
Sub 是一个小组 Super 是一个小组，Sub 的原型对象链接到了 Super 的实例对象。  
基本上所有对象顺着原型链爬到头都是 Object.prototype , 而 Object.prototype 就没有原型对象，原型链就走到头了。  
判断构造函数和原型对象是否存在于实例对象的原型链中:  
`实例对象 instanceof 构造函数`，返回一个布尔值，`原型对象.isPrototypeOf(实例对象)`，返回一个布尔值。  
上面是最简单的继承方式了，但是有两个致命缺点:  
* 所有 Sub 的实例对象都继承自同一个 Super 的实例对象，我想传参数到 Super 怎么办？
* 如果 Super 里有引用类型的值，比如上面例子中我给 Sub 的实例对象中的 arr 属性 push 一个值，岂不是牵一发动全身？  
下面说一种最常用的组合继承模式，先举个例子:  
```js
function Super(value){
  // 只在此处声明基本属性和引用属性
  this.val = value;
  this.arr = [1];
}
//  在此处声明函数
Super.prototype.fun1 = function(){};
Super.prototype.fun2 = function(){};
//Super.prototype.fun3...
function Sub(value){
  Super.call(this,value);   // 核心
  // ...
}
Sub.prototype = new Super();    // 核心
```
过程是这样的，在简单的原型链继承的基础上， Sub 的构造函数里运行 Super ，从而给 Sub 的每一个实例对象一份单独的属性，解决了上面两个问题，可以给 Super 传参数了，而且因为是独立的属性，不会因为误操作引用类型值而影响其他实例了。不过还有个小缺点: Sub 中调用的 Super 给每个 Sub 的实例对象一套新的属性，覆盖了继承的 Super 实例对象的属性，那被覆盖的的那套属性不就浪费了？岂不是白继承了？最严重的问题是 Super 被执行了两次，这不能忍(其实也没多大问题)。下面进行一下优化，把上面例子最后一行替换为:  
```js
Sub.prototype = Object.create(Super.prototype);
// Object.create() 给原型链上添加一环，否则 Sub 和 Super 的原型就重叠了。
Sub.prototype.constructor = Sub;
```
到此为止，继承非常完美。  
其他还有各路继承方式无非是在 简单原型链继承 --> 优化的组合继承 路程之间的一些思路或者封装。  
* 通过 class 继承的方式:  
通过 class 实现继承的过程与 ES5 完全相反，详细见下面 [ES6](#es6新增特性) class的继承 部分。

### 对象的深度克隆
JavaScript的基础类型是值传递，而对象是引用传递，这导致一个问题:  
克隆一个基础类型的变量的时候，克隆出来的的变量是和旧的变量完全独立的，只是值相同而已。
而克隆对象的时候就要分两种情况了，简单的赋值会让两个变量指向同一块内存，两者代表同一个对象，甚至算不上克隆克隆。但我们常常需要的是两个属性和方法完全相同但却完全独立的对象，称为深度克隆。我们接下来讨论几种深度克隆的方法。  
说几句题外的话，业界有一个非常知名的库 immutable ，个人认为很大程度上解决了深度克隆的痛点，我们修改一个对象的时候，很多时候希望得到一个全新的对象(比如Redux每次都要用一个全新的对象修改状态)，由此我们就需要进行深度克隆。而 immutable 相当于产生了一种新的对象类型，每一次修改属性都会返回一个全新的 immutable 对象，免去了我们深度克隆的工作是小事，关键性能特别好。  
* 历遍属性
```js
function clone(obj){
  var newobj = obj.constructor === Array ? [] : {};  // 用 instanceof 判断也可
  if(typeof obj !== 'object'  || obj === null ){
    return obj
  } else {
    for(var i in obj){
      newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
      // 只考虑 对象和数组， 函数虽然也是引用类型，但直接赋值并不会产生什么副作用，所以函数类型无需深度克隆。
    }
  }
  return newobj;
};
```
* 原型式克隆
```js
function clone(obj){
  function F() {};
  F.prototype = obj;
  var f = new F();
  for(var key in obj)
  {
    if(typeof obj[key] =="object")
    {
      f[key] = clone(obj[key])
    }
  }
  return f ;
}
```
这种方式不能算严格意义上的深度克隆，并没有切断新对象与被克隆对象的联系，被克隆对象作为新对象的原型存在，虽然新对象的改变不会影响旧对象，但反之则不然！而且给新对象属性重新赋值的时候只是覆盖了原型中的属性，在历遍新对象的时候也会出现问题。这种方式问题重重，除了实现特殊目的可以酌情使用，通常情况应避免使用。  
* json序列化
```js
var newObj = JSON.parse(JSON.stringify(obj));  
```
这是我最喜欢的方式了！简短粗暴直接！但是最大的问题是，毕竟JSON只是一种数据格式所以这种方式只能克隆属性，不能克隆方法，方法在序列化以后就消失了。。。

### 一些Object的方法与需要注意的点
**Object 自身的方法**:    
* 设置属性，`Object.defineProperty(obj, prop, descriptor)` 根据 descriptor 定义 obj 的 prop 属性(值，是否可写可枚举可删除等)。  
`Object.getOwnPropertyDescriptor(obj, prop)` 返回 obj 的 prop 属性的描述。
* 使对象不可拓展，`Object.preventExtensions(obj)`，obj 将不能添加新的属性。  
判断对像是否可拓展，`Object.isExtensible(obj)`。
* 密封一个对象，`Object.seal(obj)`，obj 将不可拓展且不能删除已有属性。  
判断对象是否密封，`Object.isSealed(obj)`。
* 冻结对象，`Object.freeze(obj)` obj 将被密封且不可修改。  
判断对象是否冻结，`Object.isFrozen(obj)`。
* 获取对象自身属性(包括不可枚举的)，`Object.getOwnPropertyNames(obj)`，返回 obj 所有自身属性组成的数组。  
获取对象自身属性(不包括不可枚举的)，`Object.keys(obj)`，返回 obj 所有自身可枚举属性组成的数组。  
当使用`for in`循环遍历对象的属性时，**原型链**上的所有**可枚举**属性都将被访问。  
只关心对象本身时用`Object.keys(obj)`代替 `for in`，避免历遍原型链上的属性。
* 获取某对象的原型对象，`Object.getPrototypeOf(object)`，返回 object 的原型对象。  
设置某对象的原型对象，`Object.setPrototypeOf(obj, prototype)`，**ES6 新方法**，设置 obj 的原型对象为 prototype ，该语句比较耗时。  

**Object.prototype 上的方法**:   
* 检查对象上某个属性是否存在时(存在于本身而不是原型链中)，`obj.hasOwnProperty()` 是**唯一**可用的方法，他不会向上查找原型链，只在 obj 自身查找，返回布尔值。
* 检测某对象是否存在于参数对象的原型链中，`obj.isPrototypeOf(obj2)`，obj 是否在 obj2 的原型链中，返回布尔值。
* 检测某属性是否是对象自身的可枚举属性，`obj.propertyIsEnumerable(prop)`，返回布尔值。
* 对象类型，`obj.toString()`，返回  "[object type]" type 可以是 Date，Array，Math 等对象类型。
* obj.valueOf(),修改对象返回值时的行为，使用如下:
```js
function myNumberType(n) {
    this.number = n;
}
myNumberType.prototype.valueOf = function() {
    return this.number;
};
myObj = new myNumberType(4);
myObj + 3; // 7
```

### ES6新增特性
* 判断两个值是否完全相等，Object.is(value1, value2)，类似于 === 但是可以用来判断 NaN。
* 属性和方法简写:  
```js
// 属性简写
var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}
// 等同于
var baz = {foo: foo};
// 方法简写
function f(x, y) {
  return {x, y};
}
// 等同于
function f(x, y) {
  return {x: x, y: y};
}
f(1, 2) // Object {x: 1, y: 2}
```
* 合并对象:  
`Object.assign(target, [...source]);`将 source 中所有和枚举的属性复制到 target。  
多个 source 对象有同名属性，后面的覆盖前面的。  
```js
var target = { a: 1 };
var source1 = { b: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
注意一点，该命令执行的是浅克隆，如果 source 中有属性是对象，target 中会复制该对象的引用。  
常用于给对象添加属性和方法(如给构造函数的原型添加方法)，克隆、合并对象等。
* 获取对象自身的值或键值对(做为`Object.keys(obj)`的补充不包括不可枚举的):  
`Object.keys(obj)`返回 obj 自身所有可枚举属性的值组成的数组。  
`Object.entries(obj)`返回 obj 自身所有可枚举键值对数组组成的数组，例如:
```js
var obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
// 可用于将对象转为 Map 结构
var obj = { foo: 'bar', baz: 42 };
var map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }
```
* 拓展运算符:
取出对象所有可历遍属性，举例:  
```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
// 可代替 Object.assign()
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```
可用于解构赋值中最后一个参数:
```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
// 可以这样理解，把 z 拆开以后就等于后面对象未被分配出去的键值对。
```
* Null 传导运算符:
```js
const firstName = message?.body?.user?.firstName || 'default';
// 代替
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';
```
* class:  
ES6 引入了 class 关键字，但并没有改变对象基于原型继承的原理，只是一个语法糖，让他长得像传统面向对象语言而已。  
以下两个写法完全等价:  
```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
// 类中定义的方法就是在原型上
```
有两点区别， class 中定义的方法是不可枚举的，class 必须通过 new 调用不能直接运行。  
class 不存在变量提升，使用要在定义之后。  

class 中的方法前加 static 关键字定义静态方法，只能通过 class 直接调用不能被**实例**继承。  
如果静态方法包含 this 关键字，这个 this 指的是 class，而不是实例。注意下面代码:  
```js
class Foo {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
}
Foo.bar() // hello
```
父类的静态方法，可以被子类继承，目前 class 内部无法定义静态属性。  

设置静态属性与实例属性新提案:  
class 的实例属性可以用等式，写入类的定义之中。  
静态属性直接前面加 static 即可。  
```js
class MyClass {
  myProp = 42;
  static myStaticProp = 42;
}
```
* class 的继承:  
class 通过 extends 实现继承,注意 super 关键字
```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```
extends 可以继承其他类或任何有 prototype 属性的函数。  
super 会从父类获取各路信息绑定到子类的 this。  
子类自己没有 this 对象，要先继承父类的实例对象然后再进行加工，所以要在 constructor 里调用 super 继承 this 对象后才能使用 this。  
**ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先创造父类的实例对象 this（所以必须先调用 super 方法创建和继承这个 this，并绑定到子类的 this），然后再用子类的构造函数修改this。**  
这条理由也是造成了 ES6 之前无法继承原生的构造函数(Array Function Date 等)的原型对象，而使用 class 可以。因为 ES5 中的方法是先实例化子类，再把父类的属性添加上去，但是父类有很多不能直接访问的属性或方法，这就糟了，而通过 class 继承反其道而行之先实例化父类，这就自然把所有属性和方法都继承了。  
super 作为对象时，在普通方法中，指向父类的**原型**对象；在静态方法中，指向父类。  
通过 super 调用父类的方法时，super 会绑定子类的 this。  
constructor 方法会被默认添加:
```js
class ColorPoint extends Point {
}
// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```
`Object.getPrototypeOf(object)`，获取某对象的原型对象，也可以获取某类的原型类。  
* class 的 `__proto__`与prototype  
子类的`__proto__`属性，表示构造函数的继承，总是指向父类。  
子类prototype属性的`__proto__`属性，表示方法的继承，总是指向父类的 prototype 属性。
相当于子类本身继承父类，子类的原型对象继承自父类的原型对象。  
* new.target:  
用在构造函数或者 class 内部，指向调用时 new 的构造函数或者 class。  
