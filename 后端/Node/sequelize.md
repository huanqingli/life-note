## [sequelize](http://docs.sequelizejs.com/manual/installation/getting-started.html)
### 目录
- [连接数据库](#连接数据库)
- [定义数据模型](#定义数据模型)
- [使用数据模型](#使用数据模型)
- [关联数据模型](#关联数据模型)
- [预定义查询](#预定义查询)
#### 链接数据库
```javascript
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost', // 默认localhost
  port: 3306, // MySQL默认3306
  dialect: 'mysql', // 必填
  timezone: '+08:00', //时区 默认 ＋00
  benchmark: true, // 是否输出请求时间
  pool: {
    max: 5, // 最大同时请求条数
    min: 0,
    idle: 10000
  },
});

// 测试链接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
```
#### 定义数据模型
```javascript
// 定义简单模型
const Project = sequelize.define('project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
})
const Task = sequelize.define('task', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
})

// 较复杂模型，对每一列进行配置，并配有统一配置项
const Foo = sequelize.define('foo', {
 // instantiating will automatically set the flag to true if not set
 flag: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},
 // default values for dates => current time
 myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
 // The unique property is simply a shorthand to create a unique constraint.
 someUnique: {type: Sequelize.STRING, unique: true, primaryKey: true}
 // autoIncrement can be used to create auto_incrementing integer columns
 incrementMe: { type: Sequelize.INTEGER, autoIncrement: true },
 // You can specify a custom field name via the "field" attribute:
 fieldWithUnderscores: {
     type: Sequelize.STRING,
     field: "field_with_underscores",
     validate: {notIn: [['foo', 'bar']],  // check the value is not one of these}
 },
 // It is possible to create foreign keys:
 bar_id: {
   type: Sequelize.INTEGER,
   references: {
     // This is a reference to another model
     model: Bar,
     // This is the column name of the referenced model
     key: 'id'
   }
 },
},
{
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // I want updatedAt to actually be called updateTimestamp
  updatedAt: 'updateTimestamp', // 重命名该自动生成的列
  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: true,
  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,  // 使用下划线列名，不用驼峰
  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,  // 不自动修改表名
  // define the table's name
  tableName: 'my_very_custom_table_name',  // 设置表名
  scopes: {
    deleted: {
      where: {
        deleted: true
      }
    },
  } // 预定义查询(见下方预定义查询标题)
  hooks: {
    beforeValidate: (user, options) => {
      user.mood = 'happy';
    },
    afterValidate: (user, options) => {
      user.username = 'Toni';
  } // 生命周期钩子(见下方生命周期钩子标题)
  }
  // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
  // to the model and throw an OptimisticLockingError error when stale instances are saved.
  // Set to true or a string with the attribute name you want to use to enable.
  version: true
})

// 每一列的可选配置
type                   // 数据类型
allowNull              // 是否允许 null 默认 true
defaultValue           // 默认 null
unique                 // 默认 false
primaryKey             // 默认 false
field                  // 数据库表里真实的列名(列的 key 值可以不是真实列名) 默认 null
autoIncrement          // 默认 false
validate               // 验证规则 类型为对象
references             // 外健 类型为对象 关键字 model(连接的表) key(连接的表的列)

// 表的统一配置 与默认配置项合并
omitNull               // 禁止所有列的 null 值
timestamps             // 是否包含 createdAt 和 updatedAt 列 默认 true
paranoid               // 设置为 true 时，删除操作在 deletedAt 列添加时间戳而不真正删除 默认 false
createdAt              // 重命名该列
updatedAt              // 重命名该列
deletedAt              // 重命名该列
underscored            // 使用下划线命名列 默认 false(驼峰)
freezeTableName        // 不自动规范表名 默认 false(自动规范表名)
tableName              // 设置表名 freezeTableName 需要为 true
hooks                  // 对象类型 设置不同生命周期触发的函数 [详见](http://docs.sequelizejs.com/manual/tutorial/hooks.html#declaring-hooks)
scopes                 // 预定义查询

// 数据类型 写在每一列的配置中，关键字 type
// 字符串
Sequelize.STRING                      // VARCHAR(255)
Sequelize.STRING(1234)                // VARCHAR(1234)
Sequelize.STRING.BINARY               // VARCHAR BINARY
Sequelize.TEXT                        // TEXT
Sequelize.TEXT('tiny')                // TINYTEXT
// 整型数字
Sequelize.INTEGER                     // INTEGER
Sequelize.BIGINT                      // BIGINT
Sequelize.BIGINT(11)                  // BIGINT(11)
// 浮点型数字
Sequelize.FLOAT                       // FLOAT
Sequelize.FLOAT(11)                   // FLOAT(11)
Sequelize.FLOAT(11, 12)               // FLOAT(11,12)
// 双精度浮点型
Sequelize.DOUBLE                      // DOUBLE
Sequelize.DOUBLE(11)                  // DOUBLE(11)
Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)
// decimal类型。规定整数和小数位数
Sequelize.DECIMAL                     // DECIMAL
Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)
// 日期
Sequelize.DATE                        // DATETIME for mysql
Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
Sequelize.DATEONLY                    // DATE without time.
// 布尔值
Sequelize.BOOLEAN                     // TINYINT(1)
// 枚举类型
Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'

// 验证规则 写在每列的配置中 关键字 validate
// 创建，更新，保存时自动应用
is: ["^[a-z]+$",'i'],     // will only allow letters
is: /^[a-z]+$/i,          // same as the previous example using real RegExp
not: ["[a-z]",'i'],       // will not allow letters
isEmail: true,            // checks for poem format (foo@bar.com)
isUrl: true,              // checks for url format (http://foo.com)
isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
isIPv4: true,             // checks for IPv4 (129.89.23.1)
isIPv6: true,             // checks for IPv6 format
isAlpha: true,            // will only allow letters
isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
isNumeric: true,          // will only allow numbers
isInt: true,              // checks for valid integers
isFloat: true,            // checks for valid floating point numbers
isDecimal: true,          // checks for any numbers
isLowercase: true,        // checks for lowercase
isUppercase: true,        // checks for uppercase
notNull: true,            // won't allow null
isNull: true,             // only allows null
notEmpty: true,           // don't allow empty strings
equals: 'specific value', // only allow a specific value
contains: 'foo',          // force specific substrings
notIn: [['foo', 'bar']],  // check the value is not one of these
isIn: [['foo', 'bar']],   // check the value is one of these
notContains: 'bar',       // don't allow specific substrings
len: [2,10],              // only allow values with length between 2 and 10
isUUID: 4,                // only allow uuids
isDate: true,             // only allow date strings
isAfter: "2011-11-05",    // only allow date strings after a specific date
isBefore: "2011-11-05",   // only allow date strings before a specific date
max: 23,                  // only allow values <= 23
min: 23,                  // only allow values >= 23
isCreditCard: true,       // check for valid credit card numbers
// custom validations are also possible:
isEven(value) {
  if (parseInt(value) % 2 != 0) {
    throw new Error('Only even values are allowed!')
    // we also are in the model's context here, so this.otherField
    // would get the value of otherField if it existed
  }
}

// 创建/删除 数据表
//创建
// Create the tables:
Project.sync()
Task.sync()
//删除
// drop the tables:
Project.drop()
Task.drop()
// 回调函数
// event handling:
Project.[sync|drop]().then(() => {
  // 创建/删除 成功后我要。。。
}).catch(error => {
  // 失败后我要。。。
})
// Sync all models that aren't already in the database
sequelize.sync()

// 将定义的表统一管理
// models/person.js
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'person',
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      // 自定义表名
      freezeTableName: true,
      timestamps: false,
    },
  )
// models/index.js
const Person = sequelize.import(`${__dirname}/person`)
module.exports = { Person, //其他表..... }
// routes/some-router.js
const { Person } = require('../models')
// 可以使用啦

```

#### 使用数据模型
```javascript
// 查找
// 通过 id 查找
Project.findById(123).then(project => {
  // project will be an instance of Project and stores the content of the table entry
  // with id 123. if such an entry is not defined you will get null
})
// 通过限制条件查找一项
Project.findOne({ where: {title: 'aProject'} }).then(project => {
  // project will be the first entry of the Projects table with the title 'aProject' || null
})
// 查找全部
Project.findAll({ where: { id: [1,2,3] } }).then(projects => {
  // projects will be an array of Projects having the id 1, 2 or 3
  // this is actually doing an IN query
})
// 查找全部符合条件项并统计
Project
.findAndCountAll({
   attributes: ['foo', 'bar']  // 查询哪些列
   where: {
      title: {
        $like: 'foo%' // 其他筛选条件见下文
      }
   },
   offset: 10,
   limit: 2    // 还有 order group
})
.then(result => {
  console.log(result.count); // 条数
  console.log(result.rows);  // 对象组成的数组
});
// 只计数
Project.count({ where: {'id': {$gt: 25}} }).then(c =>
  console.log("There are " + c + " projects with an id greater than 25.")
})
// 寻找最大的值，最小值，求和
/*
  Let's assume 3 person objects with an attribute age.
  The first one is 10 years old,
  the second one is 5 years old,
  the third one is 40 years old.
*/
Project.max('age').then(max => {
  // this will return 40
})
Project.max('age', { where: { age: { lt: 20 } } }).then(max => {
  // will be 10
}) // min sum 同样可做限制
Project.min('age').then(min => {
  // this will return 5
})
Project.sum('age').then(sum => {
  // this will return 55
})

// 筛选条件
$and: {a: 5}           // AND (a = 5)
$or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
$gt: 6,                // > 6
$gte: 6,               // >= 6
$lt: 10,               // < 10
$lte: 10,              // <= 10
$ne: 20,               // != 20
$eq: 3,                // = 3
$not: true,            // IS NOT TRUE
$between: [6, 10],     // BETWEEN 6 AND 10
$notBetween: [11, 15], // NOT BETWEEN 11 AND 15
$in: [1, 2],           // IN [1, 2]
$notIn: [1, 2],        // NOT IN [1, 2]
$like: '%hat',         // LIKE '%hat'
$notLike: '%hat'       // NOT LIKE '%hat'
$iLike: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
$notILike: '%hat'      // NOT ILIKE '%hat'  (PG only)
$regexp: '^[h|a|t]'    // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
$notRegexp: '^[h|a|t]' // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
$iRegexp: '^[h|a|t]'    // ~* '^[h|a|t]' (PG only)
$notIRegexp: '^[h|a|t]' // !~* '^[h|a|t]' (PG only)
$like: { $any: ['cat', 'hat']}
                       // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike
$overlap: [1, 2]       // && [1, 2] (PG array overlap operator)
$contains: [1, 2]      // @> [1, 2] (PG array contains operator)
$contained: [1, 2]     // <@ [1, 2] (PG array contained by operator)
$any: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)
//举例
{
  rank: {
    $or: {
      $lt: 1000,
      $eq: null
    }
  }
}
// rank < 1000 OR rank IS NULL
{
  createdAt: {
    $lt: new Date(),
    $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
  }
}
// createdAt < [timestamp] AND createdAt > [timestamp]
{
  $or: [
    {
      title: {
        $like: 'Boat%'
      }
    },
    {
      description: {
        $like: '%boat%'
      }
    }
  ]
}
// title LIKE 'Boat%' OR description LIKE '%boat%'
// 下面两者等价
Project.findOne({
  where: {
    name: 'a project',
    $or: [
      { id: [1,2,3] },
      { id: { $gt: 10 } }
    ]
  }
})
Project.findOne({
  where: {
    name: 'a project',
    id: {
      $or: [
        [1,2,3],
        { $gt: 10 }
      ]
    }
  }
})

// 创建数据对象
const project = Project.build({
  title: 'my awesome project',
  description: 'woot woot. this will make me a rich man'
}) // 注意！ 目前并没有保存
project.title // 'my awesome project'
task.save().catch(error => {
  // mhhh, wth!
}) // 这才保存
// 完整创建后保存
Task
  .build({ title: 'foo', description: 'bar', deadline: new Date() })
  .save()
  .then(anotherTask => {
    // you can now access the currently saved task with the variable anotherTask... nice!
  })
  .catch(error => {
    // Ooops, do some error-handling
  })
// 或者
Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).then(task => {
  // you can now access the newly created task via the variable task
})
// 批量创建
User.bulkCreate([
  { username: 'barfooz', isAdmin: true },
  { username: 'foo', isAdmin: true },
  { username: 'bar', isAdmin: false }
]，{ validate: true }).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
  return User.findAll();
}).then(users => {
  console.log(users) // ... in order to get the array of user objects
}) // bulkCreate 需要手动开启验证{ validate: true }

// 修改数据对象
// way 1
task.title = 'a very different title now'
task.save().then(() => {})
// way 2
task.update({
  title: 'a very different title now'
}).then(() => {})
// 批量更新
Task.update(
  { status: 'inactive' }, /* set attributes' value */,
  { where: { subject: 'programming' }} /* where criteria */
);

// 删除数据对象
task.destroy({ force: true })  // { force: true } 令 paranoid 为 true 时依然删除
// 批量删除
Task.destroy({
  where: {
    subject: 'programming'
  },
  truncate: true /* this will ignore where and truncate the table instead */
});

```

#### 关联数据模型
```javascript
// 一对一 归属关系
const Player = this.sequelize.define('player', {/* attributes */});
const Team  = this.sequelize.define('team', {/* attributes */});
Player.belongsTo(Team); // Will add a teamId attribute to Player to hold the primary key value for Team
// 自定义外键
const User = this.sequelize.define('user', {/* attributes */})
const Company  = this.sequelize.define('company', {/* attributes */});
User.belongsTo(Company, {foreignKey: 'fk_company'}); // Adds fk_company to User 外键在 User 表格产生
// 自定义锚点 默认是目标表的主键
User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'}); // Adds fk_companyname to User

// 一对一 包含关系 与 belongsTo 相反 也可以自定义外键等
const User = sequelize.define('user', {/* ... */})
const Project = sequelize.define('project', {/* ... */})
Project.hasOne(User) // 外键在 User 表格产生

// 一对多 包含关系
const City = sequelize.define('city', { countryCode: Sequelize.STRING });
const Country = sequelize.define('country', { isoCode: Sequelize.STRING });
// Here we can connect countries and cities base on country code
Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'}); // 锚点 isoCode
City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode'}); // 锚点 isoCode
// 一个城市只归属一个国家，一个国家可以有好多城市

// 多对多关系
Project.belongsToMany(User, {through: 'UserProject'});
User.belongsToMany(Project, {through: 'UserProject'});
// This will create a new model called UserProject with the equivalent foreign keys projectId and userId

// 设置/删除/添加/读取关联的项
Project.belongsToMany(Task)     
Task.belongsToMany(Project)      // ! ! ! 使用该句给 task 实例对象添加方法后才能使用以下方法
Project.create()...
Task.create()...
Task.create()...
// save them... and then:
project.setTasks([task1, task2]).then(() => {
  // saved!
})
project.createTask({name:...}).then(() => {
  // saved!
})
// ok, now they are saved... how do I get them later on?
project.getTasks().then(associatedTasks => {
  // associatedTasks is an array of tasks
})
// You can also pass filters to the getter method.
// They are equal to the options you can pass to a usual finder method. // 过滤查询结果
project.getTasks({ where: 'id > 10' }).then(tasks => {
  // tasks with an id greater than 10 :)
})
// You can also only retrieve certain fields of a associated object.  // 选择某些列
project.getTasks({attributes: ['title']}).then(tasks => {
  // retrieve tasks with the attributes "title" and "id"
})
// 通过设置关联项为空或者新的关联项，来删除旧的关联项
// remove the association with task1
project.setTasks([task2]).then(associatedTasks => {
  // you will get task2 only
})
// remove 'em all
project.setTasks([]).then(associatedTasks => {
  // you will get an empty array
})
// 通过被关联项删除
task2.setProjects(null).then(function() {
  // and it's gone
})
// 直接删除
// or remove 'em more directly
project.removeTask(task1).then(() => {
  // it's gone
})
// 添加关联项
project.addTask(task1).then(() => {
  // saved!
})
// 关联操作容易出问题 查看数据实例对象上的方法
console.log(project.__proto__)
```

#### 预定义查询
```sql
// 在定义表时的统一配置项中定义
defaultScope: {  // 每次查询默认使用
  where: {
    active: true
  }
},  
scopes: {        // 使用时需调用
  deleted: {
    where: {
      deleted: true
    }
  },
  activeUsers: {
    include: [
      { model: User, where: { active: true }}
    ]
  },
  random: function () {
    return {
      where: {
        someNumber: Math.random()
      }
    }
  },
  accessLevel: function (value) {
    return {
      where: {
        accessLevel: {
          $gte: value
        }
      }
    }
  }
}

// 使用方法，启用上面的预定义
Project.scope('deleted', 'random', { method: ['accessLevel', 19]}).findAll();
```
