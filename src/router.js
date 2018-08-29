import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/404.vue'
import Wage from './views/Finance/Wage.vue'
import DailyConsumption from './views/Finance/DailyConsumption.vue'
import Travel from './views/Finance/Travel.vue'
import Investment from './views/Finance/Investment.vue'
import Login from './views/Login.vue'
import Account from './views/System/Account.vue'

Vue.use(Router)


export default new Router({
    routes: [{
            path: '/',
            component: Login,
            hidden: true
        },
        {
            path: '/404.vue',
            name: '404',
            component: NotFound,
            hidden: true
        },
        {
            path: '/home',
            component: Home,
            meta: {
                requiresAuth: true //添加该字段，表示进入这个路由是需要登录的
            },
            name: '资金管理',
            // iconCls: 'el-icon-message', //图标样式class
            children: [{
                    path: '/DailyConsumption',
                    name: '日常消费',
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: DailyConsumption,
                }, {
                    path: '/travel',
                    component: Travel,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    name: '火车票'
                },
                {
                    path: '/wage',
                    name: '工资',
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: Wage,
                }, {
                    path: '/investment',
                    component: Investment,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                    name: '投资'
                },
            ],
        },
        {
            path: '/home',
            component: Home,
            meta: {
                requiresAuth: true
            },
            name: '系统管理',
            // iconCls: 'el-icon-message', //图标样式class
            children: [{
                path: '/Account',
                name: '账户管理',
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                },
                component: Account,
            }],
        },
    ]
})