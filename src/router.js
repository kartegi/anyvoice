import Vue from 'vue'
import Router from 'vue-router'
import App from './App'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/notification',
            component: () => import('./views/Notification.vue')
        }
    ]
})