package main

import "fmt"
// import "time"
// import "reflect"
// import "runtime"

// func add(a map[string]string) {
// 	a["d"] = "d"
// }

// func (x *Human) changeName(newN string) {
// 	(*x).name = newN
// }

// type Human struct {
// 	name string
// 	age  int
// }

// func main() {
// 	// var a = 1
// 	// b := [2]int{1, 2}
// 	// // a := [2]int{1, 2}
// 	// var x [2]byte
// 	// a := []byte{'1', 'b', 'c', 'd'}
// 	// a := map[string]string{"a": "a", "v": "b"}
// 	// a["c"] = "c"
// 	a := Human{name: "xyz", age: 15}
// 	// add(a)

// 	fmt.Print(a)
// 	(&a).changeName("abc")
// 	fmt.Print(a)
// }
// func say(s string) {
//     for i := 0; i < 5; i++ {
//         runtime.Gosched()
//         fmt.Println(s)
//     }
// }

// func main() {
//     go say("world") //开一个新的Goroutines执行
//     say("hello") //当前Goroutines执行
// }
type Human struct{
	name string "test"
	age int     "test1"
}

type Student struct{
	Human
	name string
	teacher string
}

func main() {
	// xa := Human{}
	// xa.name = "xa"
	// xa.age = 15
	// xaType := reflect.TypeOf(xa)
	// nameTag := xaType.Field(1).Tag
	// xb := new(Human)
	// xb.name = "xb"
	// xb.age = 10
	xc := Student{Human{"xc", 18}, "outxc", "Dra"}
	// xc.name = "lalala"
	// xc.Human.name = "hahaha"
	fmt.Println(xc.name, xc.Human.name)
}

