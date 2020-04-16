## Todo
- 后端验证输入，mysql用utf8mb4字符集，所以理论上也可以用👆等表情作为用户名。
- css-in-js。
- Redis创建token黑名单。
- salt取值和hash验证存在问题。
- 未做用户名unique处理。
- 将react-router-dom升级至V6。
- 重写路由渲染通用method。
- 侧边栏虽路由状态变化。
- 后端对于上传文件file type验证。
- 将后端json校验方式改为json schema。
- 后端检验风格改为面向对象。
- React组件性能优化（AuthProvider及其子组件重新渲染问题）。
- 优化题目的数据结构。
- upload图标显示错误。
- 后端接口role认证（中间件传递信息ctx）。
- 数据加载状态显示及错误展示。
- 长列表性能优化。

## refence
- [jwt 实践以及与session对比](https://juejin.im/post/5b532492e51d455d6825c0cc#heading-2)
- [傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.im/post/5e055d9ef265da33997a42cc#heading-10)
- [React Suspense 与 Hooks 的另类实现](http://yoyoyohamapi.me/2019/07/16/React_Suspense%E4%B8%8EHooks%E7%9A%84%E5%8F%A6%E7%B1%BB%E5%AE%9E%E7%8E%B0/)
- [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
- [JSlogo参考](https://codepen.io/EleftheriaBatsou/pen/EWdrNL/?editors=0100&__cf_chl_jschl_tk__=24205bf332de59b613dc0f29d6f3ec4dc1afc04f-1585648533-0-AbcI-60KnshDzNZt-1IylYNqdy9BGwOPc9xVFaDMj90A82S8rxk_Jow3UZFzSMgAykedF8wDAfRNrxPN6izI2G8fik1LEyNH2hC5kEvPEHWRnmnj3070Q1DaJLpKC6NxPQjwVO4PGW2ZfGQ08KaDQJev8iA2ku6xMcAzkY6NkTZ8kgVk1IpLSSQ69XZM6d3nX1CCrQ_i9y-hGBJljLd5z_Pk1qP7kReI6g1SLy9RYvLnjbUepmXgqHUMxVtezZGhIp6eRXXUf6DJHd9TN6V-h0y_jfd6cWaCVDEqtwG_bzG150auJeE2Jfs-FJi5TBOtf6aMGLvFA57jnWcIWvclabJj8iBIhWVTQzcTND6WnOnjh9VwTmji3LqwMMFxiscG-C559KCkGmRWbj4D5IhrSsg)
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [React Hook 中 createContext & useContext 跨组件透传上下文与性能优化](http://www.ptbird.cn/react-createContex-useContext.html#menu_index_9)
- [避免React Context导致的重复渲染](https://zhuanlan.zhihu.com/p/50336226)
- [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)
- [webpack4 webpack-dev-server react-router 二级路由对应 js路径问题](https://segmentfault.com/q/1010000020252715/a-1020000020252859)
- [](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/virtualize-long-list-with-react-window-95bac3673a91)

## bug
- [antd menu item](https://github.com/ant-design/ant-design/issues/15724)