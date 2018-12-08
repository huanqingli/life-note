## js备忘
- 页面重载（页面刷新）:  
	location.reload();  
	history.go(0);  
  location=location;  
- 两个对象 === 比较，只有指向同一个地址才视为相等。
- 错误捕获：
  ```js
	try{
	  if(!(name.length>=1&&name.length<=10)){
	    throw new Error('名字请限制在1-10个字符');
	  }
	}catch(err){
	  console.log(err.message);
	}
  ```
	try中有错误则之行catch，err是错误信息。throw手动抛出错误，new Error抛出时错误信息包括出错地点，err.message 为'名字请限制在1-10个字符'  
    直接  throw'名字请限制在1-10个字符' ; 抛错 err 即为'名字请限制在1-10个字符' 

- 执行顺序：  
  执行完同步任务后， setTimeout 是比 promise.then 先执行的。  
	  
