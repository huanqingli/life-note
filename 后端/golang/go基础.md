### go 基础
- 声明：常量 const x = "x" , 变量 var x = "x" 也可以 x := "x"
- 类型：布尔 bool , 数值 **float32 float64 int uint** rune int8 int16 int32 int64 byte uint8 uint16 uint32 uint64 (rune = int32，byte = uint8，int有符号整型，uint无符号整型，int uint 长度相等与系统有关) , 字符串 string  
数组类型是可以比较的，不同长度的数组不是一个类型。切片和字典是引用类型。
- 流程控制：if 后面可以声明一个仅在该逻辑块儿内有用的变量。for 可以当成 while，可以配合 range map 或者 slice 遍历切片或字典。有 switch 语句，默认每个 case 后带 break。  
- 函数：函数也是一种类型，把函数当参数传时候就发现他的作用了。
