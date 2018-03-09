## 前端测试框架对比(js单元测试框架对比)
本文主要目的在于横评业界主流的几款前端框架，顺带说下相关的一些内容。  
### 测试分类
通常应用会有 单元测试(Unit tests) 和 功能测试(Functional tests)，复杂大型应用可能会有整合测试(Integration tests)。
其中：
- 单元测试：关注应用中每个零部件的正常运转，防止后续修改影响之前的组件。
- 功能测试：确保其整体表现符合预期，关注能否让用户正常使用。
- 整合测试：确保单独运行正常的零部件整合到一起之后依然能正常运行。  

[详细资料1](https://codeutopia.net/blog/2015/04/11/what-are-unit-testing-integration-testing-and-functional-testing/)  
[详细资料2](https://www.sitepoint.com/javascript-testing-unit-functional-integration/)  

开发人员主要关注单元测试，作为开发中的反馈。本文重点讨论的单元测试框架。  
单元测试的好处：
- 如果能通过单元测试，那么通过后续测试且软件整体正常运行的概率大大提高。
- 单元测试发现的问题定位到细节，容易修改，节省时间。
- 追踪问题变得更加方便。

### 选择单元测试框架
单元测试应该：简单，快速执行，清晰的错误报告。
测试框架基本上都做了同一件事儿：
- 描述你要测试的东西
- 对其进行测试
- 判断是否符合预期
选择框架会考虑下面的点：
- 断言(Assertions)：用于判断结果是否符合预期。有些框架需要单独的断言库。
- 适合 TDD / BDD：是否适合 测试驱动型 / 行为驱动型 的测试风格。
- 异步测试：有些框架对异步测试支持良好。
- 使用的语言：大部分 js 测试框架使用 js。
- 用于特定目的：每个框架可能会擅长处理不同的问题。
- 社区是否活跃。
注：
- TDD：测试驱动型的开发方式，先写测试代码，之后编写能通过测试的业务代码，可以不断的在能通过测试的情况下重构。
- BDD：与 TDD 很相似，测试代码的风格是预期结果，更关注功能，看起来像需求文档。
其实都是先写测试代码，感觉BDD 风格更人性。  
[参考链接](https://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)

### 测试工具的类型
组合使用工具很常见，即使已选框架也能实现类似的功能
- 提供测试框架(Mocha, Jasmine, Jest, Cucumber)
- 提供断言(Chai, Jasmine, Jest, Unexpected)
- 生成，展示测试结果(Mocha, Jasmine, Jest, Karma)
- 快照测试(Jest, Ava)
- 提供仿真(Sinon, Jasmine, enzyme, Jest, testdouble)
- 生成测试覆盖率报告(Istanbul, Jest, Blanket)
- 提供类浏览器环境(Protractor, Nightwatch, Phantom, Casper)   
解释上面提到的点：
- 测试框架，即组织你的测试，当前流行 BDD 的测试结构。
- 快照测试(snapshot testing)，测试 UI 或数据结构是否和之前完全一致，通常 UI 测试不在单元测试中
- 仿真(mocks, spies, and stubs)：获取方法的调用信息，模拟方法，模块，甚至服务器  
[相关资料](https://stackoverflow.com/questions/24413184/can-someone-explain-the-difference-between-mock-stub-and-spy-in-spock-framewor)

### 各框架特点
#### Jest
- facebook 坐庄
- 基于 Jasmine 至今已经做了大量修改添加了很多特性
- 开箱即用配置少，API简单
- 支持断言和仿真
- 支持快照测试
- 在隔离环境下测试
- 互动模式选择要测试的模块
- 优雅的测试覆盖率报告，基于Istanbul
- 智能并行测试([参考](https://facebook.github.io/jest/blog/2016/03/11/javascript-unit-testing-performance.html#optimal-scheduling-of-a-test-run))  
- 较新，社区不十分成熟
- 全局环境，比如 describe 不需要引入直接用
- 较多用于 React 项目(但广泛支持各种项目)

#### Mocha
- 灵活(不包括断言和仿真，自己选对应工具)  
流行的选择：chai，sinon
- 社区成熟用的人多，测试各种东西社区都有示例
- 需要较多配置
- 可以使用快照测试，但依然需要额外配置

#### Jasmine
- 开箱即用(支持断言和仿真)
- 全局环境
- 比较'老',坑基本都有人踩过了

#### AVA
- 异步，性能好
- 简约，清晰
- 快照测试和断言需要三方支持

#### Tape
- 体积最小，只提供最关键的东西
- 对比其他框架，只提供最底层的 API

总结一下，Mocha 用的人最多，社区最成熟，灵活，可配置性强易拓展，Jest 开箱即用，里边啥都有提供全面的方案，Tape 最精简，提供最基础的东西最底层的API。

[参考](https://dzone.com/articles/comparing-jasmine-mocha-ava-tape-and-jest)

选择测试框架并不是非黑即白的事儿，就像你并不能证明PHP不是最好的语言。  
**个人倾向 Jest，原因：容易上手，开箱即用，功能全面。**
### 社区意见
下面是在 stackshare 最流行的三个测试框架如下，但应考虑到 Jest 比较年轻，参与投票的时间较短的因素。
![测试框架对比](http://owel7ec6g.bkt.clouddn.com/js%E6%B5%8B%E8%AF%95%E6%A1%86%E6%9E%B6%E6%8A%95%E7%A5%A8%E5%AF%B9%E6%AF%94.png)
下面是三个框架在过去一年里 google 的搜索热度，但应该考虑到 Jest 比较年轻，大家尝试新东西，解决新问题，可能会带来较大搜索量。
![测试框架对比](http://owel7ec6g.bkt.clouddn.com/js%E6%B5%8B%E8%AF%95%E6%A1%86%E6%9E%B6%E6%90%9C%E7%B4%A2%E9%87%8F%E5%AF%B9%E6%AF%94.png)
下面是用户使用情况的调查，可以看出， Jest 忠诚度较高，使用后弃用的概率较低，Mocha 和 Jasmine 知名度最高。数据统计于 2017 年。
![测试框架对比](http://owel7ec6g.bkt.clouddn.com/js%E6%B5%8B%E8%AF%95%E6%A1%86%E6%9E%B6%E7%94%A8%E6%88%B7%E8%B0%83%E6%9F%A5.png)
[参考](https://stackshare.io/stackups/jasmine-vs-jest-vs-mocha)
### 代码样例
要测试的代码
```js
'use strict'
var Math = {
  add(a, b) {
    return a + b;
  }
}
module.exports = Math;
```
#### AVA
```js
const test = require('ava');
const math = require('../Math');

const firstOperand = 2;
const secondOperand = 3;

test("Math add function", t => {
  const result = math.add(firstOperand, secondOperand);

  t.is(result, firstOperand + secondOperand);
});
```
#### Jasmine
```js
var math = require('../Math');
describe("Math", function() {
  var firstOperand;
  var secondOperand;
  beforeEach(function() {
    firstOperand = 2;
    secondOperand = 3;
  });
  it("should add two numbers", function() {
    var result = math.add(firstOperand, secondOperand);
    expect(result).toEqual(firstOperand + secondOperand);
  });
});
```
#### Jest
```js
jest.unmock('../Math'); // unmock to use the actual implementation of Math

var math = require('../Math');

describe("Math", function() {
  var firstOperand;
  var secondOperand;

  beforeEach(function() {
    firstOperand = 2;
    secondOperand = 3;
  });

  it("should add two numbers", function() {
    var result = math.add(firstOperand, secondOperand);
    expect(result).toEqual(firstOperand + secondOperand);
  });
});
```
#### Mocha
```js
var assert = require('assert'); // nodejs 内建断言
var math = require('../Math');
describe("Math", function() {
  var firstOperand;
  var secondOperand;
  beforeEach(function() {
    firstOperand = 2;
    secondOperand = 3;
  });
  it("should add two numbers", function() {
    var result = math.add(firstOperand, secondOperand);
    assert.equal(result, firstOperand + secondOperand);
  });
});
```
#### Tape
```js
var test = require('tape');
var math = require('../Math');
var firstOperand = 2;
var secondOperand = 3;
test("Math add function", function(t) {
  var result = math.add(firstOperand, secondOperand);
  t.equal(result, firstOperand + secondOperand);
  t.end();
});
```

[参考资料1](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3)  
[参考资料2](https://spin.atomicobject.com/2017/05/02/react-testing-jest-vs-mocha/)  
[参考资料3](https://medium.com/cardinal-solutions/lets-compare-javascript-testing-frameworks-bb500f0b1006)