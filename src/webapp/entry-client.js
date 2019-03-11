import {createApp} from './main.js'

const {app, router} = createApp()


router.onReady(()=>{
// actually mount to DOM  app.vue中的#app
// 服务端渲染，这时app已经吐出来
  app.$mount('#app')
})
