## mongoose
#### 注意
给集合定义实例方法，给模型定义静态方法时不要使用箭头函数  
```js
// define a schema
var animalSchema = new Schema({ name: String, type: String });
// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};
```
在集合上添加实例方法，该集合每一个 document 实例都可以使用。  
在模型上添加静态方法，该模型可以使该静态方法查询数据。  
#### 链接
```js
const mongodbUrl= 'mongodb://root:615615@18.220.163.96:27017/my-blog?authSource=admin'
// 注意使用的数据库和授权的数据库
const mongoose = require('mongoose')
//
mongoose.Promise = global.Promise
mongoose.connect(mongodbUrl, { useMongoClient: true })
```
#### 定义集合
```js
// 添加实例方法
var animalSchema = new Schema({ name: String, type: String });
// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};
// 选项
// 自定义集合名，使用现成的集合或者想指定集合名称时使用。
var dataSchema = new Schema({..}, { collection: 'data' });
// 用 class 定义各路方法
class PersonClass {
     // `fullName` becomes a virtual
     get fullName() {
       return `${this.firstName} ${this.lastName}`;
     }
     set fullName(v) {
       const firstSpace = v.indexOf(' ');
       this.firstName = v.split(' ')[0];
       this.lastName = firstSpace === -1 ? '' : v.substr(firstSpace + 1);
     }
     // `getFullName()` becomes a document method
     getFullName() {
       return `${this.firstName} ${this.lastName}`;
     }
     // `findByFullName()` becomes a static
     static findByFullName(name) {
       const firstSpace = name.indexOf(' ');
       const firstName = name.split(' ')[0];
       const lastName = firstSpace === -1 ? '' : name.substr(firstSpace + 1);
       return this.findOne({ firstName, lastName });
     }
   }
```
#### 建立模型
模型对应着数据库里的一个集合
```js
// 添加静态方法
// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};
var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function(err, animals) {
  console.log(animals);
});
// 添加查询方法，拓展查询链
animalSchema.query.byName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};
var Animal = mongoose.model('Animal', animalSchema);
Animal.find().byName('fido').exec(function(err, animals) {
  console.log(animals);
});
// 模型建立到指定的库
var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var Tank = connection.model('Tank', yourSchema);
```
#### 操作文档
文档是模型的实例，与真实集合里的文档一一对应
```js
var Tank = mongoose.model('Tank', yourSchema);
// 创建文档
var small = new Tank({ size: 'small' });
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
})
// or
Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
})
// 移除全部符合条件的文档
Tank.remove({ size: 'large' }, function (err) {
  if (err) return handleError(err);
  // removed!
});
// 更新文档
var query = { name: 'borne' };
Model.update(query, { name: 'jason borne' }, options, callback)
// 有 updateMany(更新全部) 和 updateOne (更新一个) 方法
// findOneAndUpdate 有返回值，上面三种没有。
// 还可以查到文档后直接修改然后 save，这种方式会验证数据，上面两个通过 option 开启数据验证，例如
var opts = { runValidators: true };
Toy.update({}, { color: 'bacon' }, opts, function (err) {
  assert.equal(err.errors.color.message,
  'Invalid color');
});
```
#### 检索
```js
// 跳过多少条
skip(100)
// 抓取多少条
limit(20)
```
#### 验证
定义数据表是定义验证规则   
存入数据前会自动验证，  
手动验证: doc.validate(callback) or doc.validateSync()  
除了 required 规则，为定义的数据不会被验证  
update 时需要 opts = { runValidators: true } 启用验证  
```js
// 使用内建验证规则(可自定义错误提示)
var breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, 'Why no bacon?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea'],
    required: function() {
      return this.bacon > 3;
    }
  }
});
// 自定义验证规则
var userSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    },
    required: [true, 'User phone number required']
  }
});

```
