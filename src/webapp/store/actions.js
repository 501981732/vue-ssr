import * as types from './types.js';
import api from './../api/index.js';

export default {
    increment: ({ commit }) => {
        commit(types.INCREMENT)
    },
    decrement: ({ commit }) => {
        commit(types.DECREMENT)
    },
    getTopics: ({ commit, state }, params) => {
        return api.getTopics(params).then(response => {
            let data = response.data
            console.log(data)
            if (data.code == 1) {
                commit(types.SET_TOPIC, data.data)
            }
        })
    }
}
