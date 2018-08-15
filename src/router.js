import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/404.vue'
import Wage from './views/Finance/Wage.vue'
import Travel from './views/Finance/Travel.vue'
import Investment from './views/Finance/Investment.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/404.vue',
      name: '404',
      component: NotFound,
      hidden: true
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import ( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      component: () =>
        import ('./views/Home.vue'),
      name: '资金管理',
      // iconCls: 'el-icon-message', //图标样式class
      children: [{
        path: '/wage',
        name: 'wage',
        component: Wage,
        hidden: true
      },{
        path: '/travel',
        component: Travel,
        name: 'Travel'
    },
    {
        path: '/investment',
        component: Investment,
        name: 'Investment'
    },
    ],
    },

  ]
})