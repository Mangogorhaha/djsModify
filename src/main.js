// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.prototype.$axios = axios

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.path == '/login') {
  //   localStorage.removeItem('cnckey');
  // }
  let cnckey = '';
  if(localStorage.getItem('userInfo')){
    cnckey = JSON.parse(localStorage.getItem('userInfo')).cnckey;
  }
  if (!cnckey && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
