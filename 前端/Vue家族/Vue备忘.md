### Vue 备忘

1. key 用于区分相同组建的不同实体，防止 Vue 自作主张进行复用。
2. class style 的绑定很强大，参见文档。
3. v-for 还可以遍历对象。
4. 通过索引改变数组不会被感知，用`vm.$set(vm.items, indexOfItem, newValue)`替代
5. 对象属性的添加删除也不会被发现。 用`vm.$set(vm.userProfile, 'age', 27)`代替，所以 Object.assign() 时不要加在原有的属性上，搞个新对象然后对原来对象重新赋值。
6. 绑定了需要传参的方法时，手动传`$event`传入原声事件(不传参是时间函数第一个形参就是原生事件)。
7. 有鼠标键盘组合使用触发的事件了！请看，`@click.ctrl="doSomething"`。
8. 可以用过 .sync 修饰一个双向绑定的 props。
9. 插槽也是父子组件沟通的好方式。
10. img的src是变量时，webpack翻译不出来准确位置，设置变量时用`require(‘./1.png’)`即可[参考](https://blog.csdn.net/Mr_YanYan/article/details/78783091)[参考2](https://blog.csdn.net/haeasringnar/article/details/81293020)
