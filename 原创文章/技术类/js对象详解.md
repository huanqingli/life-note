## js对象详解
这算是酝酿很久的一篇文章了。  
JavaScript作为一个基于对象(没有类的概念)的语言，从入门到精通到放弃一直会被**对象**这个问题围绕。  
平时发的文章基本都是开发中遇到的问题和对最佳解决方案的探讨，终于忍不住要写一篇基础概念类的文章了。  
本文探讨以下问题，在座的朋友各取所需，欢迎批评指正:  
1. [**创建对象**](#创建对象)
2. [__proto__ 与 prototype](#__proto__ 与 prototype)  //CONSTRUCTOR
3. [继承与原型链](#继承与原型链)
4. [一些需要注意的点与小 tips](#一些需要注意的点与小 tips)
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
上面构造函数的 getName 方法，每次实例化都会新建该方法，还形成了在当前情况下并没有卵用的闭包，所以构造函数添加方法用下面方式处理  
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
构造函数直接调用而不 new 的话，就看调用时候 this 指向谁就给谁添加属性了，直接调用就把属性绑到 window 上了，通过 call 或者 apply 绑定到其他对象作用域就把属性添加到其他对象了。