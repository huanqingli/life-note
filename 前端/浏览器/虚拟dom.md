## 虚拟DOM
1. 虚拟DOM 可以是任意一种表达方式

2. 所谓的 Virtual DOM 算法。包括几个步骤：  
用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中  
当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异  
把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了  

3. Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）。

[详细解释](https://medium.com/@rajaraodv/the-inner-workings-of-virtual-dom-666ee7ad47cf)
[react实例](https://medium.com/@gethylgeorge/how-virtual-dom-and-diffing-works-in-react-6fc805f9f84e)
[实现上](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)
[实现下](https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c76)
