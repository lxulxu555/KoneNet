import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {Message} from "ant-design-vue";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'find',
                name: 'Find',
                component: () => import('../views/Find.vue')
            },
            {
                path: 'wait',
                name: 'wait',
                component: () => import('../views/WaitYou.vue')
            },
            {
                path: 'index',
                name: 'Index',
                component: () => import('../views/index.vue')
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/qusetion',
        name: 'Qusetion',
        component: () => import('../views/release/AnswerQuestion')
    },
    {
        path: '/video',
        name: 'Video',
        component: () => import('../views/release/SendVideo')
    },
    {
        path: '/article',
        name: 'Article',
        component: () => import('../views/release/WriteArticle')
    },
    {
        path: '/idea',
        name: 'Idea',
        component: () => import('../views/release/WriteIdea')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/login')
    },
    {
        path: '/bangzhu',
        name: 'Bangzhu',
        component: () => import('../views/others/Bangzhu')
    },
    {
        path: '/banquan',
        name: 'Banquan',
        component: () => import('../views/others/Banquan')
    },
    {
        path: '/guanzhu',
        name: 'Guanzhu',
        component: () => import('../views/others/Guanzhu')
    },
    {
        path: '/shoucang',
        name: 'Shoucang',
        component: () => import('../views/others/Shoucang')
    },
    {
        path: '/yue',
        name: 'Yue',
        component: () => import('../views/others/Yue')
    },
    {
        path: '/people',
        name: 'People',
        component: () => import('../views/People')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path === '/login'){
        NProgress.done()
        return next()
    }
    // determine whether the user has logged in
    const hasToken = window.sessionStorage.getItem('token')

    if (!hasToken) {
        Message.error('请登录')
        return next('/login')
    } else {
        next()
        NProgress.done()
    }

})

export default router
