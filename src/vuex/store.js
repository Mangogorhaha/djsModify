import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import search from './modules/search'
import tabs from './modules/tabs'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    user,
    search,
    tabs
  }
});