import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('token')

  if (to.path == '/') {
    sessionStorage.removeItem('token');
  }
  // alert(token);
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})
