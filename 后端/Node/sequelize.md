## sequelize
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
// 对每一列进行配置
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
 fieldWithUnderscores: { type: Sequelize.STRING, field: "field_with_underscores" },

 // It is possible to create foreign keys:
 bar_id: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Bar,

     // This is the column name of the referenced model
     key: 'id'
   }
 }
})

// 数据类型

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
```
