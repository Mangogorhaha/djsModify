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
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// import VCharts from 'v-charts'
import VeLine from 'v-charts/lib/line'
import VePie from 'v-charts/lib/pie'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
// Vue.use(VCharts)
Vue.prototype.$axios = axios
Vue.component(VeLine.name, VeLine)
Vue.component(VePie.name, VePie)

//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
  defaultOptions: {
      zIndex: 9999,
      navbar: false
  }
})

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let cnckey = '';
  if(localStorage.getItem('userInfo')){
    cnckey = JSON.parse(localStorage.getItem('userInfo')).cnckey;
  }
  if (to.path == '/') {
    next({ path: '/login' })
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
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
