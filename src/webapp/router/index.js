import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/webapp/components/Index'
import Text from '@/webapp/components/test/index.vue'

Vue.use(Router)
export function createRouter() {
    const router = new Router({
        'mode':'history',
        routes: [{
                path: '/',
                name: 'index',
                component: Index
            },
            {
                path: '/test',
                name: 'test',
                component: Text
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('@/webapp/components/About')
            },
            {
                path: '/topic',
                name: 'topic',
                component: () => import('@/webapp/components/Topic')
            }
        ]
    })
    return router
}