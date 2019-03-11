// 1.对应路由
// 2.请求
// 3. 把后端请求的这套流程的数据交给后台
import { createApp } from './main'

// 核心目的：摘取里面每一个当前路由 inex/topic  找到vue router对应的vue router => component
// 2.components里异步的数据 组装成一个页面 吐出来

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // 这是给node用的 node会通过context（渲染上下文）把后台的请求真实地址传递过来 a/b 传给前端路由
    // router是前端的路由 context.url是后来的环境
    // 这样前后端路由就联动了
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        // 如果组件里面有asyncData我们就调用这个方法。然后我们需要将解析完成的状态，附加到渲染上下文(render context)中。
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state

        resolve(app)
      }).catch(reject)
    }, reject)
  })
}