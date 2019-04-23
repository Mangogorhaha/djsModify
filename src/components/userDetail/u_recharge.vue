<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="10">充值余额明细列表</el-col>
      <el-col :span="5">累计充值金额：</el-col>
      <el-col :span="5">累计赠送金额：</el-col>
      <el-col :span="4">账户余额：</el-col>
    </el-row>
    <el-table border highlight-current-row max-height="560">
      <el-table-column key="0" label="交易时间" min-width="140">
      </el-table-column>
      <el-table-column key="1" label="交易行为" min-width="140">
      </el-table-column>
      <el-table-column key="2" label="发生金额" min-width="140">
      </el-table-column>
      <el-table-column key="3" label="充值赠金" min-width="140">
      </el-table-column>
      <el-table-column key="4" label="账户余额" min-width="140">
      </el-table-column>
      <el-table-column key="5" label="备注" min-width="200">
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
