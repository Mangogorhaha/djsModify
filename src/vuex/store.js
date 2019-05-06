import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import tabs from './modules/tabs'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    user,
    tabs
  }
});