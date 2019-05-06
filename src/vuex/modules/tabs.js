const state = {
  audit: '', //审核店铺编号
  tabs: [], // 所有标签页
  activeIndex: '' // 当前激活页
};
const getters = {
  getTabs(state) { 
    return state;
  }
};
const mutations = {
  // 添加tabs
  setTabs (state, data) {
    state.tabs.push(data);
  },
  // 删除tabs
  deleteTabsIndex (state, route) {
    let index = 0;
    for (let option of state.tabs) {
      if (option.route === route) {
        break;
      }
      index++;
    }
    state.tabs.splice(index, 1);
  },
  // 设置当前激活的tab
  setActiveIndex (state, index) {
    state.activeIndex = index;
  },
};
const actions = {
  addTabs(context, item) { 
    context.commit('setTabs', item);
  },
  deleteTabs(context, item) { 
    context.commit('deleteTabsIndex', item);
  },
  setActive(context, item) { 
    context.commit('setActiveIndex', item);
  },
};
export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名，即之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  state,
  getters,
  mutations,
  actions
}