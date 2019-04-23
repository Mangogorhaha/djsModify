export default {
  // 导出列表(表头名，字段名，数据源，导出文件名)
  exportExcel(tHeader,filterVal,tableData,fileName){
    require.ensure([], () => {
      const { export_json_to_excel } = require('@/excelExport/export2Excel');
      const list = tableData;
      const data = list.map(v => filterVal.map(j => v[j]))
      export_json_to_excel(tHeader, data, fileName);// 导出的表格名称，根据需要自己命名
    })
  }
  
};