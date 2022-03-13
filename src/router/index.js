import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/Login'
import Main from '@/pages/Main'
import Home from '@/pages/Home'
import Mall from '@/pages/Mall'
import User from '@/pages/User'
import PageOne from '@/pages/Other/pageOne.vue'
import PageTwo from '@/pages/Other/pageTwo.vue'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'Main',
            path: '/',
            component: Main,
            // 跳往二级页面
            redirect: '/login',
            children: [
                {
                    name: 'mall',
                    path: 'mall',
                    component: Mall,
                },
                {
                    name: 'home',
                    path: 'home',
                    component: Home,
                },
                {
                    name: 'user',
                    path: 'user',
                    component: User,
                },
                {
                    name: 'page1',
                    path: 'page1',
                    component: PageOne,
                },
                {
                    name: 'page2',
                    path: 'page2',
                    component: PageTwo,
                },
            ]
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        }
        // 一级路由才生效
        /* {
            path: '/',
            redirect: '/home'
        } */
    ]
})

export default router