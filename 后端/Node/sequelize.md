## [sequelize](http://docs.sequelizejs.com/manual/installation/getting-started.html)
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

  hooks: {
    beforeValidate: (user, options) => {
      user.mood = 'happy';
    },
    afterValidate: (user, options) => {
      user.username = 'Toni';
    }
}  // 生命周期钩子

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
