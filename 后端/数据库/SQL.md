## SQL
### 目录
- [检索](#检索)
- [过滤检索结果](#过滤检索结果)
- [给检索结果排序](#给检索结果排序)
- [数据汇总处理](#数据汇总处理)
- [分组](#分组)
- [子查询(迭代查询)](#子查询(迭代查询))
- [联结(关联多个表)](#联结(关联多个表))
- 组合查询
- 插入数据
- 更新删除数据
- 表操作
- 视图

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
    SELECT DISTINCT 列名    
    FROM 表名;  
- 检索指定行：  
    SELECT 列名  
    FROM 表名  
    LIMIT 5 OFFSET n;   （mySQL中，选第n行后的五行。 OFFSET n 可不填写默认为0）

#### 过滤检索结果
- 寻找指定行：（举例）  
    ```sql
    SELECT prod_name, prod_price  
    FROM Products  
    WHERE prod_price = 3.49; --（＝也可以是< , > , !=）
    ```  
    查找列名为prod_name和列名为prod_price的两列，检索其中prod_price = 3.49; 的所有行。  
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
    少使用通配符，搜索速度较慢。
- 计算字段：
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

#### 给检索结果排序
SELECT 列名   
FROM 表名  
ORDER BY 列名; （按列的内容的首字母排序输出，数字型按大小）   
可以 ORDER BY 列名1,列名2; 先按列名1内容排序，排序结果相同的按列名2内容排序。  
列名后接DESC 按该列内容倒序排列。  
ORDER BY 命令放在查询、分组等语句的最后。  

#### 数据汇总处理
- 求平均值：  
    SELECT AVG(prod_price) AS avg_price  
    FROM Products;  
    表Products中prod_price的平均值。返回给 avg_price。  
    可以配合WHERE语句计算指定行的平均值。
- 求最大值：  
    MAX(prod_price) 代替 AVG(prod_price)
- 求最小值：  
    MIN(prod_price) 代替 AVG(prod_price)
- 求和：  
    SUM(prod_price) 代替 AVG(prod_price)
- 求行数：  
    SELECT COUNT(＊) AS num_cust  
    FROM Customers;  
    求表Customers有几行。返回给num_cust。  
    ＊可以换成指定列如：cust_email。计算所得行数不包括该列值为null的行。
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

#### 子查询(迭代查询)
- 一种形式：
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
- 另一种形式：
```sql
SELECT cust_name,
       cust_state,
       (SELECT COUNT(＊)
        FROM Orders
        WHERE Orders.cust_id = Customers.cust_id) AS orders
FROM Customers
```
根据Customers 表中的cust_id，去Orders表中取得计算后的数据。  
- 同一个表迭代查询：
```sql
SELECT cust_id, cust_name, cust_contact
FROM Customers
WHERE cust_name = (SELECT cust_name
                   FROM Customers
                   WHERE cust_contact = 'Jim Jones');
```

#### 联结(关联多个表)
- 两个表：
```sql
SELECT vend_name, prod_name, prod_price
FROM Vendors, Products
WHERE Vendors.vend_id = Products.vend_id;
```
根据两个表共同的列vend_id把Vendors, Products关联起来。
与
```sql
SELECT vend_name, prod_name, prod_price
FROM Vendors INNER JOIN Products
ON Vendors.vend_id = Products.vend_id;
```
结果相同。都是内联结，前一种是后一种的简写。
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
- 自联结：（同一个表中需要迭代筛选同子查询中c）
```sql
SELECT c1.cust_id, c1.cust_name, c1.cust_contact
FROM Customers AS c1, Customers AS c2
WHERE c1.cust_name = c2.cust_name
AND c2.cust_contact = 'Jim Jones';
```
- 外联结：
```sql
SELECT Customers.cust_id, Orders.order_num
FROM Customers LEFT OUTER JOIN Orders
ON Orders.cust_id = Customers.cust_id;
```
LEFT OUTER JOIN 把Customers表中没有被匹配到的cust_id，也联结进去（会显示在结果里）。  
RIGHT OUTER JOIN 是把Orders表中没有被匹配到的cust_id联结进去。
