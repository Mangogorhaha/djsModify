const state = {
  // isSearch: 0,
  radio: 0,
  searchInfo: { isSearch: 0, searchTabName: '' }
};
const getters = {
  getSearchStatus(state) { 
    return state;
  }
};
const mutations = {
  searchStatus(state, items) { 
    state.searchInfo = items;
  }
};
const actions = {
  setSearchStatus(context, item) { 
    context.commit('searchStatus', item);
  }
};
export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名，即之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  state,
  getters,
  mutations,
  actions
}
