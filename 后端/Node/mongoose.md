## mongoose
#### 链接
```js
const mongodbUrl= 'mongodb://root:615615@18.220.163.96:27017/my-blog?authSource=admin'
// 注意使用的数据库和授权的数据库
const mongoose = require('mongoose')
//
mongoose.Promise = global.Promise
mongoose.connect(mongodbUrl, { useMongoClient: true })
```
