const state = {
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
  addTabs (state, data) {
    this.state.tabs.push(data);
  },
  // 删除tabs
  deleteTabs (state, component) {
    let index = 0;
    for (let option of state.tabs) {
      if (option.component === component) {
        break;
      }
      index++;
    }
    this.state.tabs.splice(index, 1);
  },
  // 设置当前激活的tab
  setActiveIndex (state, index) {
    this.state.activeIndex = index;
  },
};
const actions = {
  setTabs(context, item) { 
    context.commit('tabs', item);
  }
};
export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名，即之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  state,
  getters,
  mutations,
  actions
}