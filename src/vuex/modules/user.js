const state = {
  userInfo: [], //初始化用户信息
};
const getters = {
  getUserInfo(state) { //承载变化的userInfo，相当于computed，监控值的变化
    return state.userInfo;
  }
};
const mutations = {
  userInfo(state, items) { //如何变化userInfo,插入items，设置userInfo的值，同步
    state.userInfo = items;
  }
};
const actions = {
  setUserInfo(context, item) { //触发mutations里面的userInfo,传入数据形参item 对应到items，异步
    context.commit('userInfo', item);
  }
};
export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名，即之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  state,
  getters,
  mutations,
  actions
}
