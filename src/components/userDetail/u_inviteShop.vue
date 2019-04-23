<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="12">邀请店铺列表</el-col>
      <el-col :span="6">人数：</el-col>
      <el-col :span="6">获取Token奖励总额：</el-col>
    </el-row>
    <el-table border highlight-current-row max-height="560">
      <el-table-column key="0" label="注册日期" min-width="140">
      </el-table-column>
      <el-table-column key="1" label="店铺编号" min-width="140">
      </el-table-column>
      <el-table-column key="2" label="手机账号" min-width="140">
      </el-table-column>
      <el-table-column key="3" label="店铺名称" min-width="140">
      </el-table-column>
      <el-table-column key="4" label="店铺状态" min-width="140">
      </el-table-column>
      <el-table-column key="5" label="token奖励" min-width="140">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
</style>
