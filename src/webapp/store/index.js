import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// 判断环境
const isBrower = typeof window !== 'undefined'

// if(!isBrower || process.env.NODE_ENV == 'development') {
    // node里很定要use
    Vue.use(Vuex)
// }

let defaultState = {
    count: 0,
    topics: []
}
// 数据预取
// 后端ssr一定要知道哪些请求是异步的，后端先把需要异步的请求执行完
let state = (isBrower && window.__INITIAL_STATE__) || defaultState

// if (window.__INITIAL_STATE__) {
//   store.replaceState(window.__INITIAL_STATE__)
// }

// 初始化state
export function creareStore(argument) {
    let store = new Vuex.Store({
        state,
        actions,
        mutations,
        getters,
    })
    return store
}






