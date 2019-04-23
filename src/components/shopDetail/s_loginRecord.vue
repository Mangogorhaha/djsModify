<template>
  <section>
    <el-col :span="24" class="dialog_title">登录记录</el-col>
    <el-table border highlight-current-row max-height="560">
      <el-table-column key="0" label="访问时间" min-width="140">
      </el-table-column>
      <el-table-column key="1" label="终端设备" min-width="140">
      </el-table-column>
      <el-table-column key="2" label="登录物理地点" min-width="140">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  
}
</script>

<style scoped>
</style>
