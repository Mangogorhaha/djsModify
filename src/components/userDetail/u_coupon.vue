<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="8">分享优惠券列表</el-col>
      <el-col :span="6">分享优惠券次数：</el-col>
      <el-col :span="6">分享的链接数：</el-col>
      <el-col :span="4">获取Token奖励总额：</el-col>
    </el-row>
    <el-table border highlight-current-row max-height="560">
      <el-table-column key="0" label="分享时间" min-width="140">
      </el-table-column>
      <el-table-column key="1" label="优惠活动编号" min-width="140">
      </el-table-column>
      <el-table-column key="2" label="优惠券名称" min-width="140">
      </el-table-column>
      <el-table-column key="3" label="店铺编号" min-width="140">
      </el-table-column>
      <el-table-column key="4" label="店铺名称" min-width="140">
      </el-table-column>
      <el-table-column key="5" label="token奖励" min-width="200">
      </el-table-column>
      <el-table-column key="6" label="分享链接" min-width="140">
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
