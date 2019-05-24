import store from '../../vuex/store'

export default {
  // 导出列表(表头名，字段名，数据源，导出文件名)
  // exportExcel(tHeader,filterVal,tableData,fileName){
  //   require.ensure([], () => {
  //     const { export_json_to_excel } = require('@/excelExport/export2Excel');
  //     const list = tableData;
  //     const data = list.map(v => filterVal.map(j => v[j]))
  //     export_json_to_excel(tHeader, data, fileName);// 导出的表格名称，根据需要自己命名
  //   })
  // },
  
  // 新增标签页
  creatTab(newTab) {
    let curIndex = store.state.tabs.tabs.findIndex(item => item.name === newTab.name);
    if (curIndex === -1) {
      store.dispatch('tabs/addTabs', newTab);
      store.dispatch('tabs/setActive', store.state.tabs.tabs.length-1+'');
    }else {
      store.dispatch('tabs/setActive', curIndex+'');
    }
  },

  // 计算列表出现次数
  countList(listName) {
    let tabs = store.state.tabs.tabs;
    let count = 0;
    tabs.forEach(item => {
      if(item.name.indexOf(listName)!=-1) count+=1;
    });
    tabs.forEach(element => {
      if(element.name === listName+count) count+=1;
    });
    return count;
  }
};