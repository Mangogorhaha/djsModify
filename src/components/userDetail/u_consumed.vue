<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="8">已消费订单明细</el-col>
      <el-col :span="6">获取 Token奖励总额：</el-col>
      <el-col :span="6">已消费订单数：</el-col>
      <el-col :span="4">已消费订单总金额：</el-col>
    </el-row>
    <el-table border highlight-current-row max-height="560">
      <el-table-column key="0" label="消费时间" min-width="140">
      </el-table-column>
      <el-table-column key="1" label="购买时间" min-width="140">
      </el-table-column>
      <el-table-column key="2" label="消费金额" min-width="140">
      </el-table-column>
      <el-table-column key="3" label="优惠券编码" min-width="140">
      </el-table-column>
      <el-table-column key="4" label="优惠券名称" min-width="140">
      </el-table-column>
      <el-table-column key="5" label="店铺名称" min-width="200">
      </el-table-column>
      <el-table-column key="6" label="token奖励" min-width="140">
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
