## 完美结合 Redux 与 React-router (react-router不切换页面)
本文可以解答以下问题:
- 链接 redux 后 react-router 不切换页面
- react-router 路由改变页面却不改变
- redux 与 react-router 结合使用的方案

简单的问题我多说两句。  
先解决问题: react-router 文档的最后一个 API [withRouter](https://reacttraining.com/react-router/web/api/withRouter)。在 connect 组建外面再包裹一层 withRouter。  
推荐你接着往下看。  
如果把 redux 链接到 Switch 或者 NavLink 以及他们的父组件，会产生一个问题: 路由不会切换页面了，或者 activeStyle 不工作了。react-router 4.x 的使用更加灵活，在 Route 外面绑定智能组件再正常不过，切换不了页面感觉有点尴尬，关键是:和我想的不一样啊!  
第一反应就是 react-router-redux。  
redux 管理状态，react-router 本质上也就是单页应用的一个状态而已，只不过和 H5 的 history API 联系到了一起，逻辑上 router 应该就是 redux的store 里的一个状态而已，归 redux 管理十分正常。看了看 react-router-redux 的源码，只是利用 history 的 API 修改路由，还有监听路由的变化修改 store。并没有什么魔法，没有解决我的问题。  
去 react-router 文档瞅一眼，最后一个 API 藏在角落当时看文档时候一掠而过根本没注意到。withRouter。  
原来是这么回事 redux 的 connect 方法重写了组件的 shouldComponentUpdate 方法，导致不能响应 location 的变化而重新渲染组件。withRouter 写在 connect 外面，withRouter 的 shouldComponentUpdate 不会被重写，组件会成功的重新渲染。  
问题到此为止解决了，那 react-router-redux 是不是两者结合使用的最佳实践或者合理的方案么？  
我觉得大多数情况下不需要 react-router-redux。  
包裹 withRouter 后路由信息可以通过组件 props 获得，还可以通过 history 操控路由获取路由。可以说 react-router 4.x 引入 H5 的 history 后，把路由信息放到 store 里显得毫无必要。  
而引入的好处是，对单页应用而言，逻辑上路由确实应该是应用状态的一部分(个人理解)。对需要频繁和在多处操作路由进行深度时光穿梭的应用，他提供了操作的方便性。除此之外，个人认为无必要性。
