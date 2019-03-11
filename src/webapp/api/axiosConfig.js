import axios from 'axios'

import { baseUrl } from './env.js'
import qs from 'qs'
// import vue from 'vue'
// import Toast from '@/plugins/toast/index.js'
// vue.use(Toast)

const ax = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    withCredentials: true // 允许携带cookie
})

// 添加请求拦截器
ax.interceptors.request.use(function(config) {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

export default ax
