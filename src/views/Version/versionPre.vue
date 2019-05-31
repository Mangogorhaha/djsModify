<template>
  <section>
    <el-form :inline="true" class="searchForm">
      <el-form-item label="终端">
        <el-select v-model="terminal" clearable>
          <el-option v-for="item in terminalOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item label="对象">
        <el-select v-model="appTarget" clearable>
          <el-option v-for="item in appTargetOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
			</el-form-item>
      <el-form-item>
				<el-button type="primary" @click="getList">查询</el-button>
			</el-form-item>
    </el-form>

    <el-table :data="dataList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" border tooltip-effect="light">
      <el-table-column label="发布端" min-width="110"></el-table-column>
      <el-table-column label="版本号" min-width="110"></el-table-column>
      <el-table-column label="发布日期" min-width="160"></el-table-column>
      <el-table-column label="更新状态" min-width="110"></el-table-column>
      <el-table-column label="更新说明" min-width="200"></el-table-column>
    </el-table>
    
    <!--分页栏-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="item" :page-sizes="itemList" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      sels: [],//列表选中列
      page: 1,
      item: 10,
      itemList: [10,20,50],
      total: 0,
      listLoading: false,

      terminal: '0', //终端
      terminalOptions: [
        { value: '0', name: '苹果' },
        { value: '1', name: '安卓' }
      ],
      appTarget: '0', //对象
      appTargetOptions: [
        { value: '0', name: '用户版' },
        { value: '1', name: '商户版' }
      ],
    }
  },
  methods: {
    getList: function() {

    },

    // 切换当前页
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.item = val;
      this.getList();
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
