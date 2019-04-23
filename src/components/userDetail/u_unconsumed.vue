<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="12">待消费订单明细</el-col>
      <el-col :span="6">待消费订单数：</el-col>
      <el-col :span="6">待消费订单总余额：<span></span></el-col>
    </el-row>
    <el-table border highlight-current-row max-height="560">
      <el-table-column key="0" label="购买时间" min-width="140">
      </el-table-column>
      <el-table-column key="1" label="支付金额" min-width="140">
      </el-table-column>
      <el-table-column key="2" label="支付方式" min-width="140">
      </el-table-column>
      <el-table-column key="3" label="优惠券编码" min-width="140">
      </el-table-column>
      <el-table-column key="4" label="优惠券名称" min-width="160">
      </el-table-column>
      <el-table-column key="5" label="店铺名称" min-width="160">
      </el-table-column>
      <el-table-column key="6" label="订单状态" min-width="160">
        待消费
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
    showDetail: function(index,row){

    }
  }
}
</script>

<style scoped>
</style>
