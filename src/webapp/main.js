// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router'
import { creareStore } from './store/'

import http from './api/index.js'

// require("@babel/polyfill");

Vue.config.productionTip = false
// 后端每次请求构建新的实例
/* eslint-disable no-new */
export function createApp() {
    const router = createRouter()
    const store = creareStore()
    Vue.prototype.$http = http
    const app = new Vue({
        // el: '#app',
        router,
        store,
        render: h=>h(App),
        // components: { App },
        // template: '<App/>'
    })
    return {app, router, store}
}