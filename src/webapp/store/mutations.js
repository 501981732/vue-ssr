import * as types from './types'
export default {
    [types.INCREMENT](state, payload) {
        state.count++
        // state.num = payload
    },
    [types.DECREMENT](state, payload) {
        state.count--
        // state.num = payload
    },
    [types.SET_TOPIC](state, payload) {
        state.topics = payload
    }
}