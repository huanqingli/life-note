## mocha
#### 断言库 chai
#### hooks
```javascript
describe('hooks', function() {
  before(function() {
    // runs before all tests in this block
  });
  after(function() {
    // runs after all tests in this block
  });
  beforeEach(function() {
    // runs before each test in this block
  });
  afterEach(function() {
    // runs after each test in this block
  });
  // test cases
});
// 执行顺序： all before() hooks run (once), then any beforeEach() hooks, tests, any afterEach() hooks, and finally after() hooks (once).

// 描述 hooks
beforeEach(function() {
  // beforeEach hook
});
beforeEach(function namedFun() {
  // beforeEach:namedFun
});
beforeEach('some description', function() {
  // beforeEach:some description
});

// 全局钩子: 写在 describe() 外面
```
