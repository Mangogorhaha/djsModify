<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="12">评论列表</el-col>
      <el-col :span="4">评论次数：</el-col>
      <el-col :span="8">获取Token奖励总额：</el-col>
    </el-row>
    <el-table border highlight-current-row max-height="560">
      <el-table-column key="0" label="评论日期" min-width="100">
      </el-table-column>
      <el-table-column key="1" label="店铺编号" min-width="100">
      </el-table-column>
      <el-table-column key="2" label="店铺名称" min-width="100">
      </el-table-column>
      <el-table-column key="3" label="类型" min-width="100">
      </el-table-column>
      <el-table-column key="4" label="评论内容" min-width="200">
      </el-table-column>
      <el-table-column key="5" label="token奖励" min-width="80">
      </el-table-column>
      <el-table-column key="6" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button size="small" @click="showDetail(scope.$index, scope.row)">查看</el-button>
				</template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
