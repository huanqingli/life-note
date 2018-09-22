## SQL
### 目录
- [检索](#检索)
- [过滤检索结果](#过滤检索结果)
- [数据汇总处理](#数据汇总处理)
- [分组](#分组)
- [给检索结果排序](#给检索结果排序)
- [表操作](#表操作)
- [插入数据](#插入数据)
- [更新删除数据](#更新删除数据)
- [子查询-迭代查询](#子查询-迭代查询)
- [联结-关联多个表](#联结-关联多个表)
- [组合查询](#组合查询)
- [视图](#视图)
- [其它](#其它)

#### 检索
- 检索某表中单个列：  
    SELECT 列名  
    FROM 表名;
- 检索某表中多个列：  
    SELECT 列名,列名,列名  
    FROM 表名;  
- 检索某表中所有列：（尽量不用）  
    SELECT *  
    FROM 表名;  
- 只检索某表中某列里不重复的项：  
    SELECT DISTINCT 列名    (如果有两列或以上，需要这些列组合起来是不重复的)
    FROM 表名;  
- 检索指定行数：  
    SELECT 列名  
    FROM 表名  
    LIMIT 5 OFFSET n;   （mySQL中，选第n行后的五行。 OFFSET n 可不填写默认为0，其它 SQL 数据库中有不同写法）

#### 过滤检索结果
- 寻找指定行：（举例）  
    ```sql
    SELECT prod_name, prod_price  
    FROM Products  
    WHERE prod_price = 3.49;（和字符串比较加单引号，数值不用）
    ```  
    查找列名为prod_name和列名为prod_price的两列，检索其中prod_price = 3.49; 的所有行。  
    = 可以替换为其它操作符，如下表

    | 操作符 | 描述 |
    | --- | --- |
    | = | 等于 |
    | <> | 不等于 |
    | > | 大于 |
    | < | 小于 |
    | >= | 大于等于 |
    | <= | 小于等于 |
    | BETWEEN | 在某个范围内 |
    | LIKE | 搜索某种模式 |

- 组合WHERE子句：
    ```sql
    SELECT prod_id, prod_price, prod_name
    FROM Products
    WHERE vend_id = 'DLL01' AND prod_price <= 4;
    ```
    AND 连接同时需要满足的两个条件，OR即满足一个条件即可，NOT 找到与后边条件不匹配的行。  
    且not，and和or可以组合使用，用小括号声明逻辑循序。  
    `WHERE vend_id IN ( 'DLL01', 'BRS01' ) `  
    IN 起到作用类似于or，速度更快，逻辑更清晰。
- 通配符搜索：
    ```sql
    SELECT prod_id, prod_name
    FROM Products
    WHERE prod_name LIKE '%bean bag%';
    ```
    ％表示任意字符出现任意次数。也可以出现在中间位置。  
    _ 表示一个字符。  
    [charlist] 表示包含在里面的任意字符，[^charlist]不包含在里面的任意字符。
    少使用通配符，搜索速度较慢。  

#### 数据汇总处理
- 算术计算：
    ```sql
    SELECT prod_id,
            quantity,
            item_price,
            quantity * item_price AS expanded_price
    FROM OrderItems
    WHERE order_num = 20008;
    ```
    `expanded_price`成为计算出来的新列。
- 字符串拼接：
    不同数据库有差异，MySQL中：
    ```sql
    SELECT concat(vend_name , vend_country)
            AS vend_title
    FROM Vendors
    ORDER BY vend_name;
    ```
    concat_ws( ':' , vend_name , vend_country) 形式第一个参数为分隔符。  
    其他数据库用＋或者||拼接字符串。
- 日期时间处理不同数据库差异较大。
- 内置方法：
    - 求平均值：  
        SELECT AVG(prod_price) AS avg_price  
        FROM Products;  
        表Products中prod_price的平均值。返回给 avg_price。  
        可以配合WHERE语句计算指定行的平均值。
    - 求最大值：MAX(prod_price)
    - 求最小值：MIN(prod_price)
    - 求和：SUM(prod_price)
    - 近似的小数点后几位：ROUND(column_name,decimals)
    - 当前日期： Now()
    - 求行数：  
        SELECT COUNT(＊) AS num_cust  
        FROM Customers;  
        求表Customers有几行。返回给num_cust。  
        ＊可以换成指定列如：cust_email。计算所得行数不包括该列值为null的行。  
        DISTINCT 列名，求不重复的列。
- 组合：  
    ```sql
    SELECT COUNT(＊) AS num_items,
           MIN(prod_price) AS price_min,
           MAX(prod_price) AS price_max,
           AVG(prod_price) AS price_avg
    FROM Products;
    ```

#### 分组
- 创建分组：  
    ```sql
    SELECT vend_id
    FROM Products
    GROUP BY vend_id;
    ```
    根据 vend_id列中内容对 vend_id分组，  
    第一行换成 `SELECT vend_id, COUNT(＊) AS num_prods` 即对每一个组计算行数。  
    注意：多行NULL会分为一组，GROUP BY子句必须出现在WHERE子句之后，ORDER BY子句之前。  
    可以对一个以上的列进行 GROUP BY
- 过滤分组：
    HAVING：类似于WHERE。唯一的差别是，WHERE过滤行，而HAVING过滤分组。  
    ```sql
    SELECT vend_id, COUNT(＊) AS num_prods
    FROM Products
    WHERE prod_price >= 4
    GROUP BY vend_id
    HAVING num_prods >= 2;
    ```
    过滤出有（两个价格大与4的产品）的供应商

#### 给检索结果排序
```sql
SELECT Company, OrderNumber 
FROM Orders 
ORDER BY Company DESC, OrderNumber ASC  
```
可以 ORDER BY 列名1,列名2; 先按列名1内容排序，排序结果相同的按列名2内容排序。  
列名后接 DESC 按该列内容倒序排列，ASC 正序(默认)。  
ORDER BY 命令放在查询、分组等语句的最后。  

#### 表操作
- 创建表:
    ```sql
    CREATE  TABLE  newProducts
    (
        prod_id         CHAR(10)           NOT NULL,
        vend_id         CHAR(10)           NOT NULL,
        prod_name       CHAR(254)          NOT NULL,
        prod_price      DECIMAL(8,2)       NOT NULL,
        prod_desc       VARCHAR(1000)      NULL
    );
    ```		
    NOT NULL 非空约束，不允许列中有NULL值下面介绍其他约束。  
	列的设置可以加上默认值，如NOT NULL后边接 DEFAULT  CURRENT_DATE() ，默认值为当前日期。（每个数据库获取当前日期语句不同。）
	后面接 PRIMARY KEY 即设置改列为主键。
    后面接  AUTO_INCREMENT 即设置为自增，只有int型可以设置。
- 约束：
    每个列可以有一种或几种约束。
    - NOT NULL 非空约束.
    - UNIQUE 唯一约束，可唯一标识数据库表中的每条记录。
    - PRIMARY KEY 主键约束，唯一标识数据库表中的每条记录，唯一且非空。
    - FOREIGN KEY 外键约束，一个表中的 FOREIGN KEY 指向另一个表中的 PRIMARY KEY。
    - CHECK 检查约束，用于限制列中的值的范围。
    - DEFAULT 默认约束，用于向列中插入默认值
    每个表可以有多个 UNIQUE 约束，但是每个表只能有一个 PRIMARY KEY 约束。  
    每种约束可以创建表时设置好，也可以后期增删.
- 索引：
    在不读取整个表的情况下，索引使数据库应用程序可以更快地查找数据。
    ```sql
    CREATE INDEX 索引名
    ON Person (列名[，列名])  
    ```
- 复制表或表中部分列:
    ```sql
    CREATE  TABLE CustCopy AS
	SELECT * FROM Customers;
    ```
    创建Customers表的复制，CustCopy。
- 修改表:
    ```sql
    ALTER TABLE Vendors
    ADD vend_phone CHAR(20);
    ALTER TABLE Vendors
    DROP COLUMN vend_phone;
    ```
    各数据库有不兼容现象，复杂表操作列可能要新建表删除旧表。  
    ALTER 还可以用来添加删除约束，删除索引等。
- 删除表：
    `DROP TABLE CustCopy;`
- 重命名表：
    `RENAME  Table oldTable TO newTable;` 

#### 插入数据
- 插入整行或部分行：
    ```sql
    INSERT INTO Customers(cust_id,
                            cust_name,
                            cust_address,
                            cust_city,
                            cust_state,
                            cust_zip,
                            cust_country,
                            cust_contact,
                            cust_email)
    VALUES('1000000007',
            'Toy Land',
            '123 Any Street',
            'New York',
            'NY',
            '11111',
            'USA',
            NULL,
            NULL);
    ```
    插入整行时，可省略 Customers 括号内的内容，即按照列的顺序，分别插入数据（不推荐）。省略 Customers 括号内的内容时，无内容的列必须用NULL占位。  
    插入部分行时，把要插入的列填入 Customers 括号内，与VALUES内容一一对应，没有提到的列默认NULL或其他默认值。
- 插入查询到的值:
    ```sql
    INSERT INTO Customers(cust_id,
                            cust_contact,
                            cust_email,
                            cust_name,
                            cust_address,
                            cust_city,
                            cust_state,
                            cust_zip,
                            cust_country)
    SELECT cust_id,
            cust_contact,
            cust_email,
            cust_name,
            cust_address,
            cust_city,
            cust_city,
            cust_state,
            cust_zip,
            cust_country
    FROM CustNew;
    ```
    把从CustNew表中查到的内容插入 Customers表中。一次插入多行的方式。

#### 更新和删除数据:
- 更新数据：
    ```sql
    UPDATE Customers
    SET cust_email = 'kim@thetoystore.com'
    WHERE cust_id = '1000000005';

    ```		
    步骤为，要更新的表，要更新的列，要更新的行。一个SET可以跟多个列用逗号隔开。  
	删除某个值，即设置他为NULL。
- 删除数据：
    ```sql
    DELETE FROM Customers
    WHERE cust_id = '1000000008';
    ```		
    删除表中指定整行，删除部分列用UPDATE  
    在UPDATE或DELETE语句使用WHERE子句前，应该先用SELECT进行测试，保证它过滤的是正确的记录，以防编写的WHERE子句不正确。如果不写WHERE会更新或删除所有行内容。

#### 子查询-迭代查询
- 一种形式：作为筛选条件出现
    ```sql
    SELECT cust_name, cust_contact
    FROM Customers
    WHERE cust_id IN (SELECT cust_id
        FROM Orders
        WHERE order_num IN (SELECT order_num
            FROM OrderItems
            WHERE prod_id = 'RGAN01'));
    ```
    先从第二个括号选择符合条件的order_num，成为第二个括号内容，再向上找到第一个括号，查到符合条件的cust_id返回给第一个括号，最后根据第一个括号内容执行主查询语句。性能问题不要嵌套太多层。  
    也就是对Customers表的查询要用到Orders表查询后返回的内容，对Orders表的查询要用到OrderItems表查询后返回的内容。
- 另一种形式：作为一列出现
    ```sql
    SELECT cust_name,
        cust_state,
        (SELECT COUNT(＊)
            FROM Orders
            WHERE Orders.cust_id = Customers.cust_id) AS orders
    FROM Customers
    ```
    根据Customers 表中的cust_id，去Orders表中取得计算后的数据。  
- 同一个表迭代查询：(就是第一种形式)
    ```sql
    SELECT cust_id, cust_name, cust_contact
    FROM Customers
    WHERE cust_name = (SELECT cust_name
                    FROM Customers
                    WHERE cust_contact = 'Jim Jones');
    ```

#### 联结-关联多个表
- 两个表：
    - 内联结
        ```sql
        SELECT vend_name, prod_name, prod_price
        FROM Vendors, Products
        WHERE Vendors.vend_id = Products.vend_id;
        ```
        根据两个表共同的列vend_id把Vendors, Products关联起来。只显示两个表能连接的记录。
        与
        ```sql
        SELECT vend_name, prod_name, prod_price
        FROM Vendors INNER JOIN Products
        ON Vendors.vend_id = Products.vend_id;
        ```
        结果相同。都是内联结，前一种是后一种的简写。  
        INNER 可省略。
    - 外联结：
        ```sql
        SELECT Customers.cust_id, Orders.order_num
        FROM Customers LEFT OUTER JOIN Orders
        ON Orders.cust_id = Customers.cust_id;
        ```
        LEFT OUTER JOIN 把Customers表中没有被匹配到的 cust_id 也联结进去（会显示在结果里）。  
        RIGHT OUTER JOIN 是把Orders表中没有被匹配到的 cust_id 也联结进去（会显示在结果里）。  
        FULL OUTER JOIN 会把两张表中没有匹配到的列也显示出来(mysql 不支持，可通过 UNION 实现)
        OUTER 可省略。
- 多个表：
    ```sql
    SELECT cust_name, cust_contact
    FROM Customers, Orders, OrderItems
    WHERE Customers.cust_id = Orders.cust_id
    AND OrderItems.order_num = Orders.order_num
    AND prod_id = 'RGAN01';
    ```
    作用同子查询中a。同样不要关联太多，有性能问题。其中表名可以使用别名，如：  
    ```sql
    SELECT cust_name, cust_contact
    FROM Customers AS C, Orders AS O, OrderItems AS OI
    WHERE C.cust_id = O.cust_id
    AND OI.order_num = O.order_num
    AND prod_id = 'RGAN01';
    ```

#### 组合查询
```sql
SELECT cust_name, cust_contact, cust_email 
FROM Customers 
WHERE cust_state IN ('IL','IN','MI') 
UNION ALL
SELECT cust_name, cust_contact, cust_email 
FROM Customers 
WHERE cust_name = 'Fun4All';
```
UNION ALL 链接两句查询语句，统一返回结果，包含重复结果。  
去掉ALL以后，去掉重复结果。  
此处（从同一个表中查询）可以用WHERE ， OR代替。  
常用作从不同表中查询时，只要列数相同就可以拼接到一起，列名按照第一句中查询的列名。  

#### 视图
对已存在的表，进行筛选，数据处理，联结等操作后返回的数据，创建的虚拟表。视图是为了重用和简化常用的查询。对视图的查询同表。  
视图总是显示最近的数据。每当用户查询视图时，数据库引擎通过使用 SQL 语句来重建数据。    
- 创建视图:
    ```sql
    CREATE  VIEW ProductCustomers AS                
    SELECT cust_name, cust_contact, prod_id
    FROM Customers, Orders, OrderItems
    WHERE Customers.cust_id = Orders.cust_id
    AND OrderItems.order_num = Orders.order_num;
    ```
    对OrderItems， Orders和Customers三个表进行联结，联结后结果形成 ProductCustomers 视图，可以把它当一张表来查询。
- 删除视图：
    `DROP VIEW ProductCustomers;`
#### 其它
- 存储过程：为以后的使用保存一条或多条SQL语句，用于简化操作，提高效率(被预编译)。每个数据库不同，见数据库具体介绍。
- 事务处理：事务处理模块中的语句，或者全部执行，或者全部不执行。可以设立保留点，执行失败时回到保留点。 
- 创建数据库: `CREATE DATABASE database_name`
- 删除数据库：`DROP DATABASE 数据库名称`
    
    