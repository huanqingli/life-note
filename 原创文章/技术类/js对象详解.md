## js对象详解
这算是酝酿很久的一篇文章了。  
JavaScript作为一个基于对象(没有类的概念)的语言，从入门到精通到放弃一直会被**对象**这个问题围绕。  
平时发的文章基本都是开发中遇到的问题和对最佳解决方案的探讨，终于忍不住要写一篇基础概念类的文章了。  
本文探讨以下问题，在座的朋友各取所需，欢迎批评指正:  
1. [**创建对象**](#创建对象)
2. [`__proto__`与prototype](#proto与prototype)
3. [继承与原型链](#继承与原型链)
4. [对象的深度克隆](#对象的深度克隆)
4. [一些Object的方法与需要注意的点](#一些Object的方法与需要注意的点)
#### 创建对象
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
传入要创建对象实例的原型对象，和原型模式几乎是一个意思也是相当于在原型链上加了一环，区别在于这种方式创建的对象没有 constructor 。
* 混合模式:  
使用原型模式时，当给实例对象设置自己专属的属性的时候，该实例对象会忽略原型链中的该属性。但当原型链中的属性是引用类型值的时候，操作不当有可能会直接修改原型对象的属性！这会影响到所有使用该原型对象的实例对象！  
大部分情况下，实例对象的多数方法是共有的，多数属性是私有的，所以属性在构造函数中设置，方法在原型中设置是合适的，构造函数与原型结合使用是通常的做法。  
还有一些方法，无非是工厂模式与构造函数与原型模式的互相结合，在生成过程和 this 指向上做一些小变化。 
#### proto与prototype
这两个到底是什么关系？搞清楚 实例对象 构造函数 原型对象 的三角关系，这两个属性的用法就自然清晰了，顺便说下 constructor。  
构造函数创建的实例对象的 constructor 指向该构造函数，构造函数的 prototype 指向对应的原型对象，实例对象的 `__proto__` 指对应的原型对象，`__proto__`是浏览器的实现，并没有出现在标准中，可以用 constructor.prototype 代替。考虑到 Object.create() 创建的对象，更安全的方法是 Object.getPrototpyeOf() 传入需要获取原型对象的实例对象。  