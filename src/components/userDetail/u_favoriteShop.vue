<template>
  <section>
    <el-row class="dialog_title">
      <el-col :span="18">收藏店铺列表</el-col>
      <el-col :span="6">收藏店铺数：</el-col>
    </el-row>
    <el-table border highlight-current-row max-height="560">
      <el-table-column key="0" label="收藏时间" min-width="140">
      </el-table-column>
      <el-table-column key="1" label="店铺编号" min-width="140">
      </el-table-column>
      <el-table-column key="2" label="店铺名称" min-width="140">
      </el-table-column>
      <el-table-column key="3" label="待购买优惠券数量" min-width="140">
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
