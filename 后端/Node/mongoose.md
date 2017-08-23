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
#### 定义表
```js
// 添加实例方法
var animalSchema = new Schema({ name: String, type: String });
// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};
```
#### 建立模型
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
```
